import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast'; // For messages
import { MessageService } from 'primeng/api'; // For messages
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';

import { Organization } from '../../../../core/domain/organization.model';
import { Month } from '../../../../core/domain/month.model';
import { Year } from '../../../../core/domain/year.model';
import {
  ExcelImporterService,
  ImportResult,
} from '../../../../infrastructure/services/excel-importer.service';
import { Occupation } from '../../../../core/domain/occupation.model';
import { PersonnelAttendanceMaster,PersonnelAttendanceDetail } from '../../../../core/domain/personnelAttendance.model';
import {MedicalPerMonthMaster,MedicalPerMonthDetail} from '../../../../core/domain/medicalPerMonth.model';

@Component({
  selector: 'app-personnel-attendance-importer',
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
  templateUrl: './personnel-attendance-importer.html',
  styleUrl: './personnel-attendance-importer.scss',
})
export class PersonnelAttendanceImporter implements OnInit {
  @Input() organizationList?: Organization[];
  @Input() monthList?: Month[];
  @Input() yearList?: Year[];
  @Input() occupationList?: Occupation[] | undefined;
  @Output() save: EventEmitter<PersonnelAttendanceMaster> =
    new EventEmitter<PersonnelAttendanceMaster>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  importedData: any[] = [];

  selectedYear?: Year;
  selectedOrganization?: Organization;
  selectedMonth?: Month;
  tableColumns: string[] = [];


  constructor(
    private messageService: MessageService,
    private excelImporter: ExcelImporterService
  ) {}

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

  public createPersonnelAttendance(): void {

    let occupationMap: Map<String, Occupation> = new Map();
    for (let occupation of this.occupationList ?? []) {
      occupationMap.set(occupation.name, occupation);
    }

    let master:PersonnelAttendanceMaster={
      year: this.selectedYear,
      yearID: this.selectedYear?.id,
      organization: this.selectedOrganization,
      organizationID: this.selectedOrganization?.id,
      month: this.selectedMonth,
      monthID: this.selectedMonth?.id,
    };
    let details: PersonnelAttendanceDetail[]=[]

    this.importedData.forEach((element) => {

      let occ:Occupation = <Occupation> occupationMap.get(<String>Object.entries(element)[0][1]);
      if(occ !=undefined && occ != null) {
        let attendance: PersonnelAttendanceDetail = {
          master: master,
          occupation: occ,
          occupationId: occ.id,
          totalDaysWorked: 31,
          totalHoursWorked: 0,
          totalMinutesWorked: 0,
          totalWorked: <number>Object.entries(element)[1][1],
          overtimeWithMultiplier: 0,
          overtimeDaysWorked: 0,
          overtimeHoursWorked: 0,
          overtimeMinWorked: 0,
          overtimeTotalWorked: 0,
          attendanceCount: <number>Object.entries(element)[1][1],
        };
        details.push(attendance);
      }
    });

    details.length;
    master.personnelAttendanceDetails = details ;
    this.save.emit(master);
  }
  onCancel(): void {
    this.cancel.emit();
  }
}
