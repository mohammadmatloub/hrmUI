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

import { PersonnelAttendanceMaster,PersonnelAttendanceDetail } from '../../../../core/domain/personnelAttendance.model';
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
  @Input() attendance?: PersonnelAttendanceMaster;
  @Output() save: EventEmitter<PersonnelAttendanceMaster> =
    new EventEmitter<PersonnelAttendanceMaster>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  personnelAttendance: PersonnelAttendanceMaster = {
    id: 0,
    organizationID: 0,
    yearID: 0,
    monthID: 0,
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
