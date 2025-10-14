import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';

import {
  PersonnelAttendanceMaster,
  PersonnelAttendanceDetail,
} from '../../../../core/domain/personnelAttendance.model';
import { PersonnelAttendanceService } from '../../../../infrastructure/services/personnel-attendance.service';
import { PersonnelAttendanceForm } from '../personnel-attendance-form/personnel-attendance-form';
import { PersonnelAttendanceImporter } from '../personnel-attendance-importer/personnel-attendance-importer';
import { Year } from '../../../../core/domain/year.model';
import { Month } from '../../../../core/domain/month.model';
import { Organization } from '../../../../core/domain/organization.model';
import { Occupation } from '../../../../core/domain/occupation.model';
import { YearService } from '../../../../infrastructure/services/year.service';
import { MonthService } from '../../../../infrastructure/services/month.service';
import { OrganizationService } from '../../../../infrastructure/services/organization.service';
import { OccupationService } from '../../../../infrastructure/services/occupation.service';

@Component({
  selector: 'app-personnel-attendance-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    PersonnelAttendanceForm,
    PersonnelAttendanceImporter,
  ],
  templateUrl: './personnel-attendance-list.html',
  styleUrl: './personnel-attendance-list.scss',
})
export class PersonnelAttendanceList implements OnInit {
  //#region properties

  // Define properties and methods for the component here
  // For example, you might want to fetch attendance data from a service
  personnelAttendances: PersonnelAttendanceMaster[] = [];
  detailsList: PersonnelAttendanceDetail[] = [];
  // Footer totals (single row)
  totalsRow: any = {};
  selectedAttendance?: PersonnelAttendanceMaster;
  createDialog: boolean = false;
  detailDialog: boolean = false;
  isEditing: boolean = false;
  importyDialog: boolean = false;
  yearList: Year[] = [];
  monthList: Month[] = [];
  organizationList: Organization[] = [];
  occupationList: Occupation[] = [];

  //#endregion

  //#region constructor

  constructor(
    private personnelAttendanceService: PersonnelAttendanceService,
    private yearService: YearService,
    private monthService: MonthService,
    private organizationService: OrganizationService,
    private occupationService: OccupationService
  ) {}

  //#endregion

  //#region angular lifecycle hooks

  ngOnInit(): void {
    this.loadPersonnelAttendances();
  }

  //#endregion

  //#region protected methods

  protected addPersonnelAttendance(): void {
    this.selectedAttendance = undefined;
    this.isEditing = false;
    this.createDialog = true;
  }

  protected importPersonnelAttendance(): void {
    this.createDialog = false;
    this.importyDialog = true;
  }

  protected createAttendance(attendance: PersonnelAttendanceMaster): void {
    // Create new attendance
    console.log('HI Create');
    this.personnelAttendanceService.create(attendance).subscribe((): void => {
      this.loadPersonnelAttendances();
      this.onCancel();
    });
  }

  protected onCancel(): void {
    this.createDialog = false;
    this.importyDialog = false;
  }

  protected detailPersonnelAttendance(
    personnelAttendance: PersonnelAttendanceMaster
  ): void {
    this.selectedAttendance = { ...personnelAttendance };

    // reset detailsList and totals
    this.detailsList = [];
    this.totalsRow = {};

    // Copy details from selectedAttendance (guard in case of undefined)
    // @ts-ignore -- model may have personnelAttendanceDetails
    if (
      this.selectedAttendance &&
      this.selectedAttendance.personnelAttendanceDetails
    ) {
      for (const attendance of this.selectedAttendance
        .personnelAttendanceDetails) {
        this.detailsList.push(attendance);
      }
    }

    // compute totals for footer rows
    this.computeTotals();

    this.detailDialog = true;
    //  this.personnelAttendanceService.getById(personnelAttendance.id).subscribe();
  }

  editPersonnelAttendance(
    personnelAttendance: PersonnelAttendanceMaster
  ): void {
    //  this.personnelAttendanceService.update(personnelAttendance.id,personnelAttendance).subscribe();
  }

  deletePersonnelAttendance(
    personnelAttendance: PersonnelAttendanceMaster
  ): void {
    this.personnelAttendanceService
      .delete(personnelAttendance.id!)
      .subscribe((): void => {
        this.loadPersonnelAttendances();
      });
  }

  //#endregion

  //#region private methods

  private loadPersonnelAttendances(): void {
    this.personnelAttendanceService
      .getAll()
      .subscribe((attendances: PersonnelAttendanceMaster[]): void => {
        this.personnelAttendances = attendances;
      });

    this.organizationService
      .getAll()
      .subscribe((organizations: Organization[]): void => {
        this.organizationList = organizations;
      });

    this.yearService.getAll().subscribe((years: Year[]): void => {
      this.yearList = years;
    });

    this.monthService.getAll().subscribe((months: Month[]): void => {
      this.monthList = months;
    });

    this.occupationService
      .getAll()
      .subscribe((occupations: Occupation[]): void => {
        this.occupationList = occupations;
      });

    this.occupationList.length;
  }
  // Add methods to handle attendance data, such as fetching, displaying, and managing attendance records

  /**
   * Compute totals for numeric columns in detailsList and populate three footer rows.
   * totals excluding something, or grouped summaries). Currently we'll produce:
   * - totalsRow: simple sum for most numeric columns
   */
  private computeTotals(): void {
    const sums: any = {
      attendanceCount: 0,
      totalHoursWorked: 0,
      totalMinutesWorked: 0,
      totalWorked: 0,
      overtimeWithMultiplier: 0,
      // model doesn't include overtimeWithOutMultiplier; keep as 0 for footer
      overtimeWithOutMultiplier: 0,
      overtimeDaysWorked: 0,
      overtimeHoursWorked: 0,
      overtimeMinutesWorked: 0,
      overtimeTotalWorked: 0,
    };

    for (const d of this.detailsList) {
      // only add when value is numeric; coerce strings to numbers where applicable
      sums.attendanceCount += Number(d.attendanceCount) || 0;
      sums.totalHoursWorked += Number(d.totalHoursWorked) || 0;
      sums.totalMinutesWorked += Number(d.totalMinutesWorked) || 0;
      sums.totalWorked += Number(d.totalWorked) || 0;
      sums.overtimeWithMultiplier += Number(d.overtimeWithMultiplier) || 0;
      // overtimeWithOutMultiplier not present on the detail model; skip per-item sum
      sums.overtimeDaysWorked += Number(d.overtimeDaysWorked) || 0;
      sums.overtimeHoursWorked += Number(d.overtimeHoursWorked) || 0;
      sums.overtimeMinutesWorked += Number(d.overtimeMinutesWorked) || 0;
      sums.overtimeTotalWorked += Number(d.overtimeTotalWorked) || 0;
    }

    // Assign the computed sums to the single footer row.
    this.totalsRow = { ...sums };
  }
}
