import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';

import { PersonnelAttendance } from '../../../../core/domain/personnelAttendance.model';
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
import {Department} from '../../../../core/domain/department.model';

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

  constructor(
    private personnelAttendanceService: PersonnelAttendanceService,
    private yearService: YearService,
    private monthService: MonthService,
    private organizationService: OrganizationService,
    private occupationService: OccupationService
  ) {}

  ngOnInit(): void {
    // Initialization logic, such as fetching data
    this.loadPersonnelAttendances();
  }
  loadPersonnelAttendances(): void {
    this.personnelAttendanceService
      .getAll()
      .subscribe((attendances: PersonnelAttendance[]): void => {
        this.personnelAttendances = attendances;
      });
    this.organizationService
      .getAll()
      .subscribe((organizations: Organization[]): void => {
        this.organizationList = organizations;
      });

    this.yearService
      .getAll()
      .subscribe((years: Year[]): void => {
      this.yearList = years;
    });

    this.monthService
      .getAll()
      .subscribe((months: Month[]): void => {
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

  addPersonnelAttendance(): void {
    this.selectedAttendance = undefined;
    this.isEditing = false;
    this.createDialog = true;
  }
  importPersonnelAttendance(): void {
    this.createDialog = false;
    this.importyDialog = true;
  }

  createAttendance(attendance: PersonnelAttendance): void {
    // Create new attendance
    console.log('HI Create');
    this.personnelAttendanceService.create(attendance).subscribe((): void => {
      this.loadPersonnelAttendances();
      this.onCancel();
    });
  }

  createAttendanceList(personnelAttendances: PersonnelAttendance[]): void {
    for(let personnelAttendance of personnelAttendances) {
      this.personnelAttendanceService.create(personnelAttendance).subscribe();
    }
    this.onCancel();
    this.loadPersonnelAttendances();
  }

  onCancel(): void {
    this.createDialog = false;
    this.importyDialog = false;
  }

  detailPersonnelAttendance(personnelAttendance: PersonnelAttendance): void {}
  editPersonnelAttendance(personnelAttendance: PersonnelAttendance): void {}

  deletePersonnelAttendance(personnelAttendance: PersonnelAttendance): void {}
}
