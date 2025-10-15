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
  ],
  templateUrl: './personnel-month-report.html',
  styleUrl: './personnel-month-report.scss',
})
export class PersonnelMonthReport implements OnInit {
  //#region properties

  months: Month[] = [];
  selectedMonth?: Month;

  years: Year[] = [];
  selectedYear?: Year;

  organizations: Organization[] = [];
  selectedOrganization?: Organization;

  balanceFrozen: boolean = false;
  occupations: Occupation[] = [];
  personnelAttendanceReportList: PersonAttendanceReport[] = [];
  reportSearchList: MedicalPerMonthReportSearch[] = [];

  // Totals per reportSearchList index (assumes reportDetail entries align with reportSearchList order)
  attendanceTotals: number[] = [];
  // stored in total minutes
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
      monthID: this.selectedMonth!.id,
      monthName: this.selectedMonth!.name,
    };
    this.reportSearchList.push(searchReport);
    // recompute totals (will be zeros until search() fills data)
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
        // compute totals now that we have data
        this.computeTotals();
      });

    console.log(this.personnelAttendanceReportList);
    // compute totals after personnelAttendanceReportList is set by the subscription
    // note: subscription is async — computeTotals will run after data assignment inside subscribe
    // to ensure this, subscribe callback should call computeTotals; adjust above to call computeTotals there.
  }

  protected calculateOvertimeTotalForMonth(monthID?: number): string {
    if (monthID === undefined || monthID === null) return '0:00';
    const idx: number = this.reportSearchList.findIndex(
      (r: MedicalPerMonthReportSearch): boolean => r.monthID === monthID
    );
    const minutes: number = idx >= 0 ? this.overtimeTotals[idx] || 0 : 0;
    return this.formatMinutesToTime(minutes);
  }

  protected calculateAttendanceTotalForMonth(monthID?: number): number {
    if (monthID === undefined || monthID === null) return 0;
    const idx: number = this.reportSearchList.findIndex(
      (r: MedicalPerMonthReportSearch): boolean => r.monthID === monthID
    );
    return idx >= 0 ? this.attendanceTotals[idx] || 0 : 0;
  }

  protected calculateOvertimeWithMultiplierTotalForMonth(
    monthID?: number
  ): string {
    if (monthID === undefined || monthID === null) return '0:00';
    const idx: number = this.reportSearchList.findIndex(
      (r: MedicalPerMonthReportSearch): boolean => r.monthID === monthID
    );
    const minutes: number =
      idx >= 0 ? this.overtimeWithMultiplierTotals[idx] || 0 : 0;
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

  // compute totals arrays based on current personnelAttendanceReportList and reportSearchList
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

    // Assume that for each PersonAttendanceReport, reportDetail array aligns with reportSearchList order
    this.personnelAttendanceReportList.forEach(
      (report: PersonAttendanceReport): void => {
        for (let i: number = 0; i < cols; i++) {
          const detail: PersonAttendanceReportDetail =
            report.reportDetail && report.reportDetail[i];
          if (detail) {
            const att: number = Number(detail.attendanceCount) || 0;
            // overtime fields are stored as strings like "HH:MM" — parse to minutes
            const otTotal: number = this.parseTimeToMinutes(
              detail.overtimeTotalWorked as any
            );
            const otWith: number = this.parseTimeToMinutes(
              detail.overtimeWithMultiplier as any
            );

            this.attendanceTotals[i] += att;
            this.overtimeTotals[i] += otTotal;
            this.overtimeWithMultiplierTotals[i] += otWith;
          }
        }
      }
    );
  }

  // parse a time value like "HH:MM" (or numeric) into total minutes
  private parseTimeToMinutes(
    value: string | number | undefined | null
  ): number {
    if (value === undefined || value === null) return 0;
    if (typeof value === 'number') return Math.floor(value);
    const s: string = String(value).trim();
    if (!s) return 0;
    const parts: string[] = s.split(':');
    if (parts.length === 1) {
      // treat as minutes or hours? assume it's minutes
      const n: number = Number(parts[0]);
      return isNaN(n) ? 0 : n;
    }
    const hours: number = Number(parts[0]) || 0;
    const minutes: number = Number(parts[1]) || 0;
    return hours * 60 + minutes;
  }

  // format minutes back to H:MM (minutes padded to 2 digits)
  private formatMinutesToTime(totalMinutes: number): string {
    if (!totalMinutes || totalMinutes === 0) return '0:00';
    const hours: number = Math.floor(totalMinutes / 60);
    const minutes: number = Math.abs(totalMinutes % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }

  // helpers to get totals by monthID (finds index in reportSearchList)

  //#endregion
}
