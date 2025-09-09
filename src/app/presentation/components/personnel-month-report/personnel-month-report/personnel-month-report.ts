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
import { PersonnelAttendance } from '../../../../core/domain/personnelAttendance.model';
import { OccupationService } from '../../../../infrastructure/services/occupation.service';
import { MonthService } from '../../../../infrastructure/services/month.service';
import { PersonnelAttendanceService } from '../../../../infrastructure/services/personnel-attendance.service';
import { OrganizationService } from '../../../../infrastructure/services/organization.service';
import { YearService } from '../../../../infrastructure/services/year.service';
import { PersonAttendanceReportService } from '../../../../infrastructure/services/person-attendance-report.service';
import { MedicalPerMonthReportSearch } from '../../../../core/domain/medicalPerMonthReportSearch.model';
import { PersonAttendanceReport } from '../../../../core/domain/personAttendanceReport.model';

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
  months: Month[] = [];
  selectedMonth?: Month;

  years: Year[] = [];
  selectedYear?: Year;

  organizations: Organization[] = [];
  selectedOrganization?: Organization;

  balanceFrozen: boolean = false;
  occupations: Occupation[] = [];
  personnelAttendanceList: PersonnelAttendance[] = [];
  personnelAttendanceReportList: PersonAttendanceReport[] = [];

  constructor(
    private occupationService: OccupationService,
    private monthService: MonthService,
    private personAttendanceReportService: PersonAttendanceReportService,
    private organizationService: OrganizationService,
    private yearService: YearService
  ) {}

  localData(): void {
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

  ngOnInit(): void {
    this.localData();
  }

search(): void {
    let search: MedicalPerMonthReportSearch = {};
    search.yearID = this.selectedYear?.id;
    search.organizationID = this.selectedOrganization?.id;
    search.monthID = this.selectedMonth?.id;
    this.personAttendanceReportService
      .getAll(search)
      .subscribe(
        (person: PersonAttendanceReport[]) =>
          (this.personnelAttendanceReportList = person)
      );

    console.log(this.personnelAttendanceReportList);
  }
}
