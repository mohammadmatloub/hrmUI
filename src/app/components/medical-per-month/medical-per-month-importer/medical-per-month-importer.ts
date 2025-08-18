import { Component, Input, OnInit } from '@angular/core';
// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast'; // For messages
import { MessageService } from 'primeng/api'; // For messages
import { FileSelectEvent } from 'primeng/fileupload';
import { ExcelImporterService, ImportResult } from '../../../services/excel-importer.service';
import { MedicalPerMonth } from '../../../models/medicalPerMonth.model';
import { ButtonModule } from 'primeng/button';
import { Organization } from '../../../models/organization.model';

import { Service } from '../../../models/service.model';
import { Month } from '../../../models/month.model';
import { Year } from '../../../models/year.model';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-medical-per-month-importer',
   imports: [TableModule,CommonModule,FormsModule, FileUploadModule,ToastModule,ButtonModule,Select ],
   standalone:true,
   providers: [MessageService],
  templateUrl: './medical-per-month-importer.html',
  styleUrl: './medical-per-month-importer.scss'
})
export class MedicalPerMonthImporter implements OnInit {
  @Input() organizationList?: Organization[];
  @Input() monthList?: Month[];
  @Input() yearList?: Year[];
  @Input() serviceList?: Service[] | undefined;
  importedData: any[] = [];
  tableColumns: string[] = [];
  medicalPerMonthList : MedicalPerMonth[] = [];
  selectedYear?:Year;
  selectedOrganization?:Organization;
  selectedmonth?:Month ;
  myMap: Map<string, Service> = new Map();

  constructor(
    private messageService: MessageService,
    private excelImporter: ExcelImporterService
  ) {}

  ngOnInit(): void {
    for (let service of this.serviceList ?? []) {
      this.myMap.set(service.name, service);
    }
  }

  

  /** Handles file selection event from file upload UI */
  async onFileSelect(event: FileSelectEvent): Promise<void> {
    const file = event.files[0];

    if (!file) {
      this.showMessage('warn', 'No File Selected', 'Please choose an Excel file.');
      return;
    }

    this.showMessage('info', 'File Selected', file.name);

    try {
      const result: ImportResult = await this.excelImporter.import(file);
      if (result.data.length === 0) {
        this.showMessage('warn', 'Empty File', 'The selected Excel file is empty.');
        this.clearData();
        return;
      }

      this.tableColumns = result.columns;
      this.importedData = result.data;
      this.showMessage('success', 'File Processed', 'Excel data loaded successfully.');
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
  private showMessage(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  /** Resets table data and columns */
  private clearData(): void {
    this.importedData = [];
    this.tableColumns = [];
  }

 public createMedicalPerMonth(): void {
    this.importedData.forEach(element => {

      let service :Service | undefined  = this.myMap.get(element[0]);
       // We can directly assign 'element' if its structure matches MedicalPerMonth
       let medicalPerMonth: MedicalPerMonth = {
         id: element[0],
         organization: this.selectedOrganization,
         organizationId: this.selectedOrganization?.id,
         month: this.selectedmonth,
         monthId: this.selectedmonth?.id,
         yearId: this.selectedYear?.id,
         year: this.selectedYear,
         service: service,
         serviceId: service?.id,
         totalMedicalPerMonth: element[3]
       };
       this.medicalPerMonthList.push(medicalPerMonth);
    });
    console.log("Medical Per Month List:", this.medicalPerMonthList);
  }


}
