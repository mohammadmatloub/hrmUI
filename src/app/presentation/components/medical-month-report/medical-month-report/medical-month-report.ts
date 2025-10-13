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
    this.serviceService.getAll().subscribe((service: Service[]): void => {
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
        console.log(
          'medicalPersonAttendanceMonthReport',
          this.medicalPersonAttendanceMonthReport
        );
      });
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
