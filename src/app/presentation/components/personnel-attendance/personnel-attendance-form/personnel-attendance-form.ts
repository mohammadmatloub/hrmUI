import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

import { PersonnelAttendance } from '../../../../core/domain/personnelAttendance.model';
import { Month } from '../../../../core/domain/month.model';
import { Year } from '../../../../core/domain/year.model';
import { Organization } from '../../../../core/domain/organization.model';
import { Department } from '../../../../core/domain/department.model';
import { Occupation } from '../../../../core/domain/occupation.model';
import { DepartmentService } from '../../../../infrastructure/services/department.service';
import { MonthService } from '../../../../infrastructure/services/month.service';
import { YearService } from '../../../../infrastructure/services/year.service';
import { OrganizationService } from '../../../../infrastructure/services/organization.service';
import { OccupationService } from '../../../../infrastructure/services/occupation.service';

@Component({
  selector: 'app-personnel-attendance-form',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    SelectModule,
    InputNumberModule,
  ],
  templateUrl: './personnel-attendance-form.html',
  styleUrl: './personnel-attendance-form.scss',
})
export class PersonnelAttendanceForm implements OnChanges, OnInit {
  @Input() attendance?: PersonnelAttendance;
  @Output() save: EventEmitter<PersonnelAttendance> =
    new EventEmitter<PersonnelAttendance>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  personnelAttendance: PersonnelAttendance = {
    id: 0,
    occupationId: 0,
    organizationId: 0,
    departmentId: 0,
    yearId: 0,
    monthId: 0,

    overtimeDaysWorked: 0,
    overtimeHoursWorked: 0,
    overtimeMinWorked: 0,
    overtimeTotalWorked: 0,

    overtimeWithMultiplier: 0,
    overtimeWithOutMultiplier: 0,

    totalHoursWorked: 0,
    totalMinutesWorked: 0,
    totalWorked: 0,

    attendanceCount: 0,
  };

  yearList: Year[] = [];
  selectedYear: Year | undefined;

  monthList: Month[] = [];
  selectedMonth: Month | undefined;

  organizationList: Organization[] = [];
  selectedOrganization: Organization | undefined;

  departmentList: Department[] = [];
  selectedDepartment: Department | undefined;

  occupationList: Occupation[] = [];
  selectedOccupation: Occupation | undefined;

  constructor(
    private yearService: YearService,
    private monthService: MonthService,
    private organizationService: OrganizationService,
    private departmentService: DepartmentService,
    private occupationService: OccupationService
  ) {}

  ngOnInit(): void {
    this.organizationService
      .getAll()
      .subscribe((organizations: Organization[]): void => {
        this.organizationList = organizations;
      });

    this.departmentService
      .getAll()
      .subscribe((departments: Department[]): void => {
        this.departmentList = departments;
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
  }

  ngOnChanges(): void {
    // Handle changes to the input properties
  }

  onSubmit(): void {
    this.save.emit(this.personnelAttendance);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
