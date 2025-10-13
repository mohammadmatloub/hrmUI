import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast'; // For messages
import { MessageService } from 'primeng/api'; // For messages
import { FileSelectEvent } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';

import { Organization } from '../../../../core/domain/organization.model';
import { Month } from '../../../../core/domain/month.model';
import { Year } from '../../../../core/domain/year.model';
import { Service } from '../../../../core/domain/service.model';
import { MedicalPerMonthMaster,MedicalPerMonthDetail } from '../../../../core/domain/medicalPerMonth.model';
import {
  ExcelImporterService,
  ImportResult,
} from '../../../../infrastructure/services/excel-importer.service';

@Component({
  selector: 'app-medical-per-month-importer',
  imports: [
    TableModule,
    CommonModule,
    FormsModule,
    FileUploadModule,
    ToastModule,
    ButtonModule,
    Select,
  ],
  standalone: true,
  providers: [MessageService],
  templateUrl: './medical-per-month-importer.html',
  styleUrl: './medical-per-month-importer.scss',
})
export class MedicalPerMonthImporter implements OnInit {
  @Input() organizationList?: Organization[];
  @Input() monthList?: Month[];
  @Input() yearList?: Year[];
  @Input() serviceList?: Service[] | undefined;
  @Output() save: EventEmitter<MedicalPerMonthMaster> =
    new EventEmitter<MedicalPerMonthMaster>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  importedData: any[] = [];
  tableColumns: string[] = [];
  masters : MedicalPerMonthMaster[] = [];
  selectedYear?: Year;
  selectedOrganization?: Organization;
  selectedmonth?: Month;


  constructor(
    private messageService: MessageService,
    private excelImporter: ExcelImporterService
  ) {
  }

  ngOnInit(): void {

  }


  /** Handles file selection event from file upload UI */
  async onFileSelect(event: FileSelectEvent): Promise<void> {
    const file = event.files[0];

    if (!file) {
      this.showMessage(
        'warn',
        'No File Selected',
        'Please choose an Excel file.'
      );
      return;
    }

    this.showMessage('info', 'File Selected', file.name);

    try {
      const result: ImportResult = await this.excelImporter.import(file);
      if (result.data.length === 0) {
        this.showMessage(
          'warn',
          'Empty File',
          'The selected Excel file is empty.'
        );
        this.clearData();
        return;
      }

      this.tableColumns = result.columns;
      this.importedData = result.data;
      this.showMessage(
        'success',
        'File Processed',
        'Excel data loaded successfully.'
      );
    } catch (error) {
      console.error('File reading error:', error);
      this.showMessage('error', 'File Error', 'Could not read the file.');
    }
  }

  /** Clears the imported data */
  onFileClear(): void {
    this.clearData();
    this.showMessage('info', 'File Cleared', 'Imported data reset.');
  }

  /** Displays a message using PrimeNG's MessageService */
  private showMessage(
    severity: 'success' | 'info' | 'warn' | 'error',
    summary: string,
    detail: string
  ) {
    this.messageService.add({ severity, summary, detail });
  }

  /** Resets table data and columns */
  private clearData(): void {
    this.importedData = [];
    this.tableColumns = [];
  }

  public onSave(): void {

    let serviceMap: Map<String, Service> = new Map();
    for (let service of this.serviceList ?? []) {
      serviceMap.set(service.name, service);
    }
    let monthMap: Map<String, Month> = new Map();
    for (let month of this.monthList ?? []) {
      monthMap.set(month.name, month);
    }



    this.importedData.forEach((element: any): void => {
      let map = new Map(Object.entries(element));

      let master: MedicalPerMonthMaster={
        organization: this.selectedOrganization,
        organizationID: this.selectedOrganization?.id,
        month: this.selectedmonth,
        monthID: this.selectedmonth?.id,
        yearID: this.selectedYear?.id,
        year: this.selectedYear,
      }
      let medicalPerMonthDetails :MedicalPerMonthDetail[] = [];
      for (let key of map.keys()) {
        if(serviceMap.has(key)) {
          let service: Service | undefined = serviceMap.get(key);
          let medicalPerMonth: MedicalPerMonthDetail = {
            service: service,
            serviceID: service?.id,
            totalMedicalPerMonth: <number>map.get(<string>service?.name),
          };
          medicalPerMonthDetails.push(medicalPerMonth);
        }
      }
      master.medicalPerMonthDetails = medicalPerMonthDetails;
      this.masters.push(master);

    });

    for (const master of this.masters) {
      this.save.emit(master);
    }

  }

  onCancel(): void {
    this.cancel.emit();
  }
}
