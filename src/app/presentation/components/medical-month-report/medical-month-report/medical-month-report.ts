import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { PanelModule } from 'primeng/panel';

import { Month } from '../../../../core/domain/month.model';
import { Year } from '../../../../core/domain/year.model';
import { Organization } from '../../../../core/domain/organization.model';
import { MedicalPersonAttendanceMonthReport } from '../../../../core/domain/medicalPersonAttendanceMonthReport.model';
import { Service } from '../../../../core/domain/service.model';
import { MedicalPerMonthsReportService } from '../../../../infrastructure/services/medical-Per-Months-Report.service';
import { MonthService } from '../../../../infrastructure/services/month.service';
import { ServiceService } from '../../../../infrastructure/services/service.service';
import { OrganizationService } from '../../../../infrastructure/services/organization.service';
import { YearService } from '../../../../infrastructure/services/year.service';
import { MedicalPerMonthReportSearch } from '../../../../core/domain/medicalPerMonthReportSearch.model';
import { ChartModule } from 'primeng/chart';

interface Column {
  field: number;
  header: string;
}

@Component({
  selector: 'app-medical-month-report',
  imports: [
    TableModule,
    CommonModule,
    ToastModule,
    ButtonModule,
    Select,
    FormsModule,
    PanelModule,
    ChartModule,
  ],
  templateUrl: './medical-month-report.html',
  styleUrl: './medical-month-report.scss',
})
export class MedicalMonthReport implements OnInit {
  months: Month[] = [];

  years: Year[] = [];
  selectedYear?: Year;

  organizations: Organization[] = [];
  selectedOrganization?: Organization;
  medicalPersonAttendanceMonthReport: MedicalPersonAttendanceMonthReport[] = [];

  services: Service[] = [];
  // totals per column (service id order matches cols)
  serviceTotals: number[] = [];
  // totals for totalPerson
  totalPersonSum: number = 0;
  // total over time (may be numeric or time string) stored in minutes if string
  totalOverTimeMinutes: number = 0;

  constructor(
    private medicalPerMonthReportService: MedicalPerMonthsReportService,
    private monthService: MonthService,
    private serviceService: ServiceService,
    private organizationService: OrganizationService,
    private yearService: YearService
  ) {}

  cols: Column[] = [];

  ngOnInit(): void {
    this.localData();
  }

  localData(): void {
    this.serviceService.getLeaf().subscribe((service: Service[]): void => {
      this.services = service;
      this.createColumn(service);
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

  createColumn(ServiceList: Service[]): void {
    this.cols = ServiceList.map((item: Service) => ({
      field: item.id || 0,
      header: item.name,
    }));
  }

  search(): void {
    let search: MedicalPerMonthReportSearch = {};
    search.yearID = this.selectedYear?.id;
    search.organizationID = this.selectedOrganization?.id;
    this.medicalPerMonthReportService
      .getAll(search)
      .subscribe((medical: MedicalPersonAttendanceMonthReport[]) => {
        this.medicalPersonAttendanceMonthReport = medical;
        // compute totals
        this.computeTotals();
        console.log(
          'medicalPersonAttendanceMonthReport',
          this.medicalPersonAttendanceMonthReport
        );
      });
  }

  computeTotals(): void {
    const cols = this.cols ? this.cols.length : 0;
    this.serviceTotals = new Array(cols).fill(0);
    this.totalPersonSum = 0;
    this.totalOverTimeMinutes = 0;

    if (!this.medicalPersonAttendanceMonthReport) return;

    this.medicalPersonAttendanceMonthReport.forEach((row) => {
      this.totalPersonSum += Number(row.attendance) || 0;

      // totalOverTime may be a time string like "HH:MM" or numeric
      const ot = this.parseTimeToMinutes(row.overtimeHoursWorked);
      this.totalOverTimeMinutes += ot;

      // sum services by cols order (cols.field is service id)
      for (let i = 0; i < cols; i++) {
        const serviceId = this.cols[i].field;
        const val = this.getMedicalCountByServiceId(
          row.medicalPerMonthDTOList,
          serviceId
        );
        this.serviceTotals[i] += Number(val) || 0;
      }
    });
  }

  parseTimeToMinutes(value: any): number {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return Math.floor(value);
    const s = String(value).trim();
    if (!s) return 0;
    const parts = s.split(':');
    if (parts.length === 1) {
      const n = Number(parts[0]);
      return isNaN(n) ? 0 : n;
    }
    const hours = Number(parts[0]) || 0;
    const minutes = Number(parts[1]) || 0;
    return hours * 60 + minutes;
  }

  formatMinutesToTime(totalMinutes: number): string {
    if (!totalMinutes || totalMinutes === 0) return '0:00';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.abs(totalMinutes % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }

  getMedicalCountByServiceId(
    medicalPerMonthDTOList: any[] = [],
    serviceID: number | string
  ): number {
    if (!medicalPerMonthDTOList || medicalPerMonthDTOList.length === 0)
      return 0;
    const id: number =
      typeof serviceID === 'string' ? Number(serviceID) : serviceID;
    const found: any = medicalPerMonthDTOList.find(
      (item: any): boolean => item.serviceID === id
    );
    return found ? found.medicalCount : 0;
  }
}
