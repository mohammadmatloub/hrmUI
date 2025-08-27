import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { PersonnelAttendance } from '../../../models/personnelAttendance.model';
import { PersonnelAttendanceService } from '../../../services/personnel-attendance.service';
import { PersonnelAttendanceForm } from '../personnel-attendance-form/personnel-attendance-form';
import { PersonnelAttendanceImporter } from "../personnel-attendance-importer/personnel-attendance-importer";
import {MedicalPerMonthImporter} from '../../medical-per-month/medical-per-month-importer/medical-per-month-importer';
import {Year} from '../../../models/year.model';
import {Month} from '../../../models/month.model';
import {Organization} from '../../../models/organization.model';
import {Service} from '../../../models/service.model';
import {Occupation} from '../../../models/occupation.model';
import {YearService} from '../../../services/year.service';
import {MonthService} from '../../../services/month.service';
import {OrganizationService} from '../../../services/organization.service';
import {OccupationService} from '../../../services/occupation.service';
@Component({
  selector: 'app-personnel-attendance-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, DialogModule, PersonnelAttendanceForm, PersonnelAttendanceImporter, MedicalPerMonthImporter],
  templateUrl: './personnel-attendance-list.html',
  styleUrl: './personnel-attendance-list.scss'
})
export class PersonnelAttendanceList implements OnInit {
  // Define properties and methods for the component here
  // For example, you might want to fetch attendance data from a service
  personnelAttendances: PersonnelAttendance[] = [];
  selectedAttendance?: PersonnelAttendance;
  createDialog: boolean = false;
  isEditing: boolean = false;
  importyDialog: boolean = false;
  yearList: Year[] = [];
  monthList: Month[] = [];
  organizationList: Organization[] = [];
  occupationList: Occupation[] = [];

  constructor(private personnelAttendanceService: PersonnelAttendanceService,
              private yearService :YearService,
              private monthService :MonthService,
              private organizationService :OrganizationService,
              private occupationService :OccupationService) {}

  ngOnInit(): void {
    // Initialization logic, such as fetching data
    this.loadPersonnelAttendances();
  }
  loadPersonnelAttendances(): void {
    this.personnelAttendanceService.getAll().subscribe(attendances => {
      this.personnelAttendances = attendances;
    });
  }
  // Add methods to handle attendance data, such as fetching, displaying, and managing attendance records

  addPersonnelAttendance(): void {
    this.selectedAttendance = undefined;
    this.isEditing = false;
    this.createDialog = true;
  }
  importPersonnelAttendance(): void {
    this.createDialog=false;
    this.importyDialog = true;
  }

  createAttendance(attendance: PersonnelAttendance): void {
      // Create new attendance
      console.log("HI Create")
    this.personnelAttendanceService.create(attendance).subscribe(() => {
      this.loadPersonnelAttendances();
      this.closeDialog();
    });
  }

  closeDialog(): void {
    this.createDialog = false;
  }
}
