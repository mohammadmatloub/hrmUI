import { Component, Input, OnInit, Output } from '@angular/core';
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
import { PersonnelAttendance } from '../../../../core/domain/personnelAttendance.model';

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
  @Output() personnelAttendanceList: PersonnelAttendance[] = [];
  importedData: any[] = [];

  selectedYear?: Year;
  selectedOrganization?: Organization;
  selectedMonth?: Month;
  tableColumns: string[] = [];
  occupationMap: Map<string, Occupation> = new Map();

  constructor(
    private messageService: MessageService,
    private excelImporter: ExcelImporterService
  ) {}

  ngOnInit(): void {
    for (let occupation of this.occupationList ?? []) {
      this.occupationMap.set(occupation.name, occupation);
    }
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
    this.importedData.forEach((element) => {
      let occ: Occupation | undefined = this.occupationMap.get(element[0]);

      let attendance: PersonnelAttendance = {
        year: this.selectedYear,
        yearId: this.selectedYear?.id,
        organization: this.selectedOrganization,
        organizationId: this.selectedOrganization?.id,
        month: this.selectedMonth,
        monthId: this.selectedMonth?.id,
        occupation: occ,
        occupationId: occ?.id,
        totalHoursWorked: 0,
        totalMinutesWorked: 0,
        totalWorked: element[1],
        overtimeWithMultiplier: 0,
        overtimeWithOutMultiplier: 0,
        overtimeDaysWorked: 0,
        overtimeHoursWorked: 0,
        overtimeMinWorked: 0,
        overtimeTotalWorked: 0,
        attendanceCount: 0,
      };
      this.personnelAttendanceList.push(attendance);
    });
  }
}
