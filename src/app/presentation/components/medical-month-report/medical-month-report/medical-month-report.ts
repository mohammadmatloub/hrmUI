import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';

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
  //#region properties

  cols: Column[] = [];

  months: Month[] = [];

  years: Year[] = [];
  selectedYear?: Year;

  organizations: Organization[] = [];
  selectedOrganization?: Organization;
  medicalPersonAttendanceMonthReport: MedicalPersonAttendanceMonthReport[] = [];

  services: Service[] = [];
  serviceTotals: number[] = [];
  totalPersonSum: number = 0;
  totalOvertimeWithCoefficient: string = '0:00';
  totalOvertimeWithoutCoefficient: string = '0:00';
  tableHeight: string = '70vh';

  //#endregion

  //#region constructor

  constructor(
    private medicalPerMonthReportService: MedicalPerMonthsReportService,
    private monthService: MonthService,
    private serviceService: ServiceService,
    private organizationService: OrganizationService,
    private yearService: YearService
  ) {}

  //#endregion

  //#region angular lifecycle hooks

  ngOnInit(): void {
    this.localData();
    this.calculateTableHeight();
  }

  //#endregion

  //#region events methods

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.calculateTableHeight();
  }

  //#endregion

  //#region protected methods

  protected search(): void {
    let search: MedicalPerMonthReportSearch = {};
    search.yearID = this.selectedYear?.id;
    search.organizationID = this.selectedOrganization?.id;
    this.medicalPerMonthReportService
      .getAll(search)
      .subscribe((medical: MedicalPersonAttendanceMonthReport[]): void => {
        this.medicalPersonAttendanceMonthReport = medical;
        this.computeTotals();
        console.log(
          'medicalPersonAttendanceMonthReport',
          this.medicalPersonAttendanceMonthReport
        );
      });
  }

  protected formatMinutesToTime(totalMinutes: number): string {
    if (!totalMinutes || totalMinutes === 0) return '0:00';
    const hours: number = Math.floor(totalMinutes / 60);
    const minutes: number = Math.abs(totalMinutes % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }

  protected getMedicalCountByServiceId(
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

  //#endregion

  //#region private methods

  private calculateTableHeight(): void {
    const windowHeight: number = window.innerHeight;
    const headerHeight = 250;
    const calculatedHeight: number = windowHeight - headerHeight;
    this.tableHeight = `${calculatedHeight}px`;
  }

  private localData(): void {
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

  private createColumn(ServiceList: Service[]): void {
    this.cols = ServiceList.map((item: Service) => ({
      field: item.id || 0,
      header: item.name,
    }));
  }

  private computeTotals(): void {
    const cols: number = this.cols ? this.cols.length : 0;
    this.serviceTotals = new Array(cols).fill(0);
    this.totalPersonSum = 0;

    let totalMinutesWithCoeff: number = 0;
    let totalMinutesWithoutCoeff: number = 0;

    if (!this.medicalPersonAttendanceMonthReport) return;

    this.medicalPersonAttendanceMonthReport.forEach((row) => {
      this.totalPersonSum += Number(row.attendance) || 0;

      const hoursWithCoeff: number = this.parseToNumber(
        row.overtimeWithHoursWorked
      );
      const minutesWithCoeff: number = this.parseToNumber(
        row.overtimeWithMinutesWorked
      );
      totalMinutesWithCoeff += hoursWithCoeff * 60 + minutesWithCoeff;

      const hoursWithoutCoeff: number = this.parseToNumber(
        row.overtimeHoursWorked
      );
      const minutesWithoutCoeff: number = this.parseToNumber(
        row.overtimeMinutesWorked
      );
      totalMinutesWithoutCoeff += hoursWithoutCoeff * 60 + minutesWithoutCoeff;

      // sum services by cols order
      for (let i: number = 0; i < cols; i++) {
        const serviceId: number = this.cols[i].field;
        const val: number = this.getMedicalCountByServiceId(
          row.medicalPerMonthDTOList,
          serviceId
        );
        this.serviceTotals[i] += Number(val) || 0;
      }
    });

    this.totalOvertimeWithCoefficient = this.formatMinutesToTime(
      totalMinutesWithCoeff
    );
    this.totalOvertimeWithoutCoefficient = this.formatMinutesToTime(
      totalMinutesWithoutCoeff
    );
  }

  private parseToNumber(value: any): number {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    const parsed: number = Number(value);
    return isNaN(parsed) ? 0 : parsed;
  }

  //#endregion
}
