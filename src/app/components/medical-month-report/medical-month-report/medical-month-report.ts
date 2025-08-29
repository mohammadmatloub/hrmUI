import { Component,OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../services/service.service';
import { Service } from '../../../models/service.model';
import { Month } from '../../../models/month.model';
import { MonthService } from '../../../services/month.service';
import { Year } from '../../../models/year.model';
import { Organization } from '../../../models/organization.model';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { YearService } from '../../../services/year.service';
import { OrganizationService } from '../../../services/organization.service';
import { PanelModule } from 'primeng/panel';
import {  MedicalPerMonthsReportService } from '../../../services/medical-Per-Months-Report.service';
import { MedicalPersonAttendanceMonthReport } from '../../../models/medicalPersonAttendanceMonthReport.model';
import { MedicalPerMonthReportSearch } from '../../../models/medicalPerMonthReportSearch.model';


interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-medical-month-report',
  imports: [TableModule,CommonModule,ToastModule,ButtonModule,Select,FormsModule,PanelModule],
  templateUrl: './medical-month-report.html',
  styleUrl: './medical-month-report.scss'
})
export class MedicalMonthReport implements OnInit {

  months :Month[] = [];

  years : Year[] = [];
  selectedYear?:Year;
  
  organizations: Organization[] = [];
  selectedOrganization?:Organization;
  medicalPersonAttendanceMonthReport:MedicalPersonAttendanceMonthReport[]=[];

  services: Service[] = [];

  constructor(
    private medicalPerMonthReportService: MedicalPerMonthsReportService,
    private monthService: MonthService ,
    private serviceService: ServiceService, 
    private organizationService: OrganizationService,
    private yearService:YearService) {

  }

 cols: Column[]=[];

  localData(){
    this.serviceService.getAll().subscribe(service => {
      this.services = service;
       this.createColumn(service);
    });
    this.monthService.getAll().subscribe(month => {
      this.months = month;
    });
    this.organizationService.getAll().subscribe(organizaion =>{
      this.organizations = organizaion;
    });
    this.yearService.getAll().subscribe(year =>{
      this.years = year;
    });

  }

  ngOnInit(): void {
    this.localData();
   
        
  }

  createColumn(ServiceList : Service[]){
    ServiceList.forEach(service => {
      this.cols.push({ field: "name", header: service.name });
    });
  }

  search(){
    let search : MedicalPerMonthReportSearch ={};
    search.yearID=this.selectedYear?.id;
    search.organizationID=this.selectedOrganization?.id;
    this.medicalPerMonthReportService.getAll(search).subscribe(medical=>
      this.medicalPersonAttendanceMonthReport = medical

    );

    console.log(this.medicalPersonAttendanceMonthReport);
  }
  
}