import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Select } from 'primeng/select';
import { PanelModule } from 'primeng/panel';

import { Month } from '../../../../core/domain/month.model';
import { Year } from '../../../../core/domain/year.model';
import { Organization } from '../../../../core/domain/organization.model';
import { Occupation } from '../../../../core/domain/occupation.model';
import { OccupationService } from '../../../../infrastructure/services/occupation.service';
import { MonthService } from '../../../../infrastructure/services/month.service';
import { OrganizationService } from '../../../../infrastructure/services/organization.service';
import { YearService } from '../../../../infrastructure/services/year.service';
import { PersonAttendanceReportService } from '../../../../infrastructure/services/person-attendance-report.service';
import { MedicalPerMonthReportSearch } from '../../../../core/domain/medicalPerMonthReportSearch.model';
import {
  PersonAttendanceReport,
  PersonAttendanceReportDetail,
} from '../../../../core/domain/personAttendanceReport.model';
import {MultiSelect} from 'primeng/multiselect';

@Component({
  selector: 'app-personnel-month-report',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    ToastModule,
    Select,
    FormsModule,
    PanelModule,
    MultiSelect,
  ],
  templateUrl: './personnel-month-report.html',
  styleUrl: './personnel-month-report.scss',
})
export class PersonnelMonthReport implements OnInit {
  //#region properties

  months: Month[] = [];
  selectedMonths?: Month[] =[];

  years: Year[] = [];
  selectedYear?: Year;

  organizations: Organization[] = [];
  selectedOrganization?: Organization;

  balanceFrozen: boolean = false;
  occupations: Occupation[] = [];
  personnelAttendanceReportList: PersonAttendanceReport[] = [];
  reportSearchList: MedicalPerMonthReportSearch[] = [];

  // Totals per reportSearchList index
  attendanceTotals: number[] = [];
  overtimeTotals: number[] = [];
  overtimeWithMultiplierTotals: number[] = [];

  //#endregion

  //#region constructor

  constructor(
    private occupationService: OccupationService,
    private monthService: MonthService,
    private personAttendanceReportService: PersonAttendanceReportService,
    private organizationService: OrganizationService,
    private yearService: YearService
  ) {}

  //#endregion

  //#region angular lifecycle hooks

  ngOnInit(): void {
    this.localData();
  }

  //#endregion

  //#region protected methods

  protected addReportSearch(): void {
    let searchReport: MedicalPerMonthReportSearch = {
      yearID: this.selectedYear!.id,
      yearName: this.selectedYear!.name,
      organizationID: this.selectedOrganization!.id,
      organizationName: this.selectedOrganization!.name,
      months: this.selectedMonths ?? []
    };
    this.reportSearchList.push(searchReport);
    this.computeTotals();
  }

  protected deleteReportSearch(search: MedicalPerMonthReportSearch): void {
    this.reportSearchList = this.reportSearchList.filter(
      (item: MedicalPerMonthReportSearch): boolean => item !== search
    );
    this.computeTotals();
  }

  protected search(): void {
    this.personAttendanceReportService
      .getAll(this.reportSearchList)
      .subscribe((person: PersonAttendanceReport[]) => {
        this.personnelAttendanceReportList = person;
        this.computeTotals();

        console.log('Personnel List:', this.personnelAttendanceReportList);
        console.log('Report Search List:', this.reportSearchList);
        console.log('Attendance Totals:', this.attendanceTotals);
        console.log('Overtime Totals:', this.overtimeTotals);
        console.log(
          'Overtime Multiplier Totals:',
          this.overtimeWithMultiplierTotals
        );
      });
  }

  protected calculateAttendanceTotalByIndex(index: number): number {
    return this.attendanceTotals[index] || 0;
  }

  protected calculateOvertimeTotalByIndex(index: number): string {
    const minutes: number = this.overtimeTotals[index] || 0;
    return this.formatMinutesToTime(minutes);
  }

  protected calculateOvertimeWithMultiplierTotalByIndex(index: number): string {
    const minutes: number = this.overtimeWithMultiplierTotals[index] || 0;
    return this.formatMinutesToTime(minutes);
  }

  //#endregion

  //#region private methods

  private localData(): void {
    this.occupationService.getAll().subscribe((data: Occupation[]): void => {
      this.occupations = data;
    });

    this.monthService.getAll().subscribe((month: Month[]): void => {
      this.months = month;
    });

    this.organizationService
      .getAll()
      .subscribe((organizaion: Organization[]): void => {
        this.organizations = organizaion;
      });

    this.yearService.getAll().subscribe((year: Year[]): void => {
      this.years = year;
    });
  }

  private computeTotals(): void {
    const cols: number = this.reportSearchList
      ? this.reportSearchList.length
      : 0;

    this.attendanceTotals = new Array(cols).fill(0);
    this.overtimeTotals = new Array(cols).fill(0);
    this.overtimeWithMultiplierTotals = new Array(cols).fill(0);

    if (
      !this.personnelAttendanceReportList ||
      this.personnelAttendanceReportList.length === 0
    ) {
      return;
    }

    this.personnelAttendanceReportList.forEach(
      (report: PersonAttendanceReport): void => {
        if (!report.reportDetail) return;

        report.reportDetail.forEach(
          (detail: PersonAttendanceReportDetail, index: number): void => {
            if (index < cols) {
              const att: number = Number(detail.attendanceCount) || 0;
              const otTotal: number = this.parseTimeToMinutes(
                detail.overtimeTotalWorked as string
              );
              const otWith: number = this.parseTimeToMinutes(
                detail.overtimeWithMultiplier as string
              );

              this.attendanceTotals[index] += att;
              this.overtimeTotals[index] += otTotal;
              this.overtimeWithMultiplierTotals[index] += otWith;
            }
          }
        );
      }
    );
  }

  private parseTimeToMinutes(
    value: string | number | undefined | null
  ): number {
    if (value === undefined || value === null) return 0;
    if (typeof value === 'number') return Math.floor(value);

    const s: string = String(value).trim();
    if (!s) return 0;

    const parts: string[] = s.split(':').map((p: string): string => p.trim());

    if (parts.length === 1) {
      const n: number = Number(parts[0]);
      return isNaN(n) ? 0 : n;
    }

    const hours: number = Number(parts[0]) || 0;
    const minutes: number = Number(parts[1]) || 0;
    return hours * 60 + minutes;
  }

  private formatMinutesToTime(totalMinutes: number): string {
    if (!totalMinutes || totalMinutes === 0) return '0:00';
    const hours: number = Math.floor(totalMinutes / 60);
    const minutes: number = Math.abs(totalMinutes % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }

/*  protected getReportDetailByMonthId(
    reportDetails: PersonAttendanceReportDetail[] | undefined,
    monthId: number
  ): PersonAttendanceReportDetail | undefined {
    if (!reportDetails || monthId === undefined) {
      return undefined;
    }

    const index: number = this.reportSearchList.findIndex(
      (r: MedicalPerMonthReportSearch): boolean => r.monthID === monthId
    );
    if (index === -1 || index >= reportDetails.length) {
      return undefined;
    }

    return reportDetails[index];
  }*/

  protected formatTimeDisplay(timeStr: string | undefined | null): string {
    if (!timeStr) return '0:00';

    const cleaned: string = timeStr.replace(/\s+/g, '');
    const parts: string[] = cleaned.split(':');

    if (parts.length !== 2) return '0:00';

    const hours: number = parseInt(parts[0]) || 0;
    const minutes: number = parseInt(parts[1]) || 0;

    const totalMinutes: number = hours * 60 + minutes;
    const finalHours: number = Math.floor(totalMinutes / 60);
    const finalMinutes: number = totalMinutes % 60;

    return `${finalHours}:${finalMinutes.toString().padStart(2, '0')}`;
  }

  //#endregion
}
