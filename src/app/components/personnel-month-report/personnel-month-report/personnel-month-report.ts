import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Occupation } from '../../../models/occupation.model';
import { OccupationService } from '../../../services/occupation.service';
import { ToggleButton } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { PersonnelAttendanceService } from '../../../services/personnel-attendance.service';
import { PersonnelAttendance } from '../../../models/personnelAttendance.model';
import { Year } from '../../../models/year.model';
import { Organization } from '../../../models/organization.model';
import { Month } from '../../../models/month.model';
import { ToastModule } from 'primeng/toast';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { YearService } from '../../../services/year.service';
import { OrganizationService } from '../../../services/organization.service';
import { PanelModule } from 'primeng/panel';
import { MonthService } from '../../../services/month.service';


@Component({
  selector: 'app-personnel-month-report',
  imports: [TableModule, CommonModule,ButtonModule, ToastModule,Select,FormsModule,PanelModule],
  templateUrl: './personnel-month-report.html',
  styleUrl: './personnel-month-report.scss'
})
export class PersonnelMonthReport implements OnInit {
  months :Month[] = [];
  selectedMonth?:Month;

  years : Year[] = [];
  selectedYear?:Year;
  
  organizations: Organization[] = [];
  selectedOrganization?:Organization;

  balanceFrozen: boolean = false;
  occupations: Occupation[] = [];
  personnelAttendanceList :PersonnelAttendance[] =[];

  constructor(
    private occupationService: OccupationService,private monthService: MonthService ,
    private personnelAttendanceService:PersonnelAttendanceService ,
    private organizationService: OrganizationService,private yearService:YearService) {}

  localData(){
    this.occupationService.getAll().subscribe(data => {
      this.occupations = data;
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

  search(){
    console.log(this.selectedYear);
  }
 

}
