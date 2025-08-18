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


@Component({
  selector: 'app-personnel-month-report',
  imports: [TableModule, CommonModule,ButtonModule],
  templateUrl: './personnel-month-report.html',
  styleUrl: './personnel-month-report.scss'
})
export class PersonnelMonthReport implements OnInit {
  @Input() year?:Year;
  @Input() month?:Month;
  @Input() organization?: Organization;

  balanceFrozen: boolean = false;
  occupations: Occupation[] = [];
  personnelAttendanceList :PersonnelAttendance[] =[];

  constructor(private occupationService: OccupationService,private personnelAttendanceService:PersonnelAttendanceService) {}

  localData(){
    this.occupationService.getAll().subscribe(data => {
      this.occupations = data;
    });

 
  }

  ngOnInit(): void {
    this.localData();
  }

 

}
