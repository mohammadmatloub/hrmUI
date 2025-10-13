import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';

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
import { AgGridAngular } from 'ag-grid-angular';
import { BaseList } from '../../../../shared/ag-grid/base-list';
import { ColDef } from 'ag-grid-community';
import { ActionsCellRenderer } from '../../../../shared/ag-grid/cell-renderer/actions/actions-cell-renderer.component';
import {
  PersonnelAttendanceDetail,
  PersonnelAttendanceMaster,
} from '../../../../core/domain/personnelAttendance.model';

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
    AgGridAngular,
  ],
  templateUrl: './personnel-attendance-list.html',
  styleUrl: './personnel-attendance-list.scss',
})
export class PersonnelAttendanceList extends BaseList implements OnInit {
  // Define properties and methods for the component here
  // For example, you might want to fetch attendance data from a service
  personnelAttendances: PersonnelAttendanceMaster[] = [];
  detailsList: PersonnelAttendanceDetail[] = [];
  selectedAttendance?: PersonnelAttendanceMaster;
  createDialog: boolean = false;
  detailDialog: boolean = false;
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
  ) {
    super();
  }

  ngOnInit(): void {
    this.createColumns();
  }

  override onGridReady(param: any): void {
    this.gridApi = param.api;
    this.setDataSource();
  }

  override setDataSource(): void {
    this.loadPersonnelAttendances();
  }

  loadPersonnelAttendances(): void {
    this.personnelAttendanceService
      .getAll()
      .subscribe((attendances: PersonnelAttendanceMaster[]): void => {
        this.gridApi.setGridOption('rowData', attendances);
        // this.personnelAttendances = attendances;
      });
    this.organizationService
      .getAll()
      .subscribe((organizations: Organization[]): void => {
        this.organizationList = organizations;
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

  createAttendance(attendance: PersonnelAttendanceMaster): void {
    // Create new attendance
    console.log('HI Create');
    this.personnelAttendanceService.create(attendance).subscribe((): void => {
      this.loadPersonnelAttendances();
      this.onCancel();
    });
  }

  closeDialog(): void {
    this.createDialog = false;
  }

  onCancel(): void {
    this.createDialog = false;
    this.importyDialog = false;
  }

  detailPersonnelAttendance(
    personnelAttendance: PersonnelAttendanceMaster
  ): void {
    this.selectedAttendance = { ...personnelAttendance };

    // @ts-ignore
    for (let attendance of this.selectedAttendance
      ?.personnelAttendanceDetails) {
      this.detailsList.push(attendance);
    }

    this.detailDialog = true;
    //  this.personnelAttendanceService.getById(personnelAttendance.id).subscribe();
  }
  editPersonnelAttendance(
    personnelAttendance: PersonnelAttendanceMaster
  ): void {
    //  this.personnelAttendanceService.update(personnelAttendance.id,personnelAttendance).subscribe();
  }

  deletePersonnelAttendance(
    personnelAttendance: PersonnelAttendanceMaster
  ): void {
    this.personnelAttendanceService
      .delete(personnelAttendance.id!)
      .subscribe((): void => {
        this.loadPersonnelAttendances();
      });
  }

  override createColumns(): void {
    const columns: ColDef[] = [
      {
        field: 'year',
        headerName: 'سال',
        valueGetter: (params) => params.data.year.name,
      },
      {
        field: 'month',
        headerName: 'ماه',
        valueGetter: (params) => params.data.month.name,
      },
      {
        field: 'occupation',
        headerName: 'عنوان شغلي',
        valueGetter: (params) => params.data.occupation.name,
      },
      {
        field: 'totalHoursWorked',
        headerName: 'ساعت هاي كاركرد',
      },
      {
        field: 'totalMinutesWorked',
        headerName: 'دقيقه هاي كاركرد',
      },
      {
        field: 'totalWorked',
        headerName: 'جمع كاركرد',
      },
      {
        field: 'overtimeWithMultiplier',
        headerName: 'اضافه كار با ضريب',
      },
      {
        field: 'overtimeWithOutMultiplier',
        headerName: 'اضافه كار بدون ضريب',
      },
      {
        field: 'overtimeDaysWorked',
        headerName: 'تعداد روزهاي اضافه كار',
      },
      {
        field: 'overtimeHoursWorked',
        headerName: 'ساعت هاي اضافه كار',
      },
      {
        field: 'overtimeMinWorked',
        headerName: 'دقيقه هاي اضافه كار',
      },
      {
        field: 'overtimeTotalWorked',
        headerName: 'جمع اضافه كار',
      },
      {
        field: 'attendanceCount',
        headerName: 'تعداد پرسنل حاضر',
      },
      {
        field: 'actions',
        headerName: '',
        pinned: 'left',
        cellRenderer: ActionsCellRenderer,
        cellRendererParams: (params: any) => [
          {
            actions: [
              {
                rounded: true,
                text: true,
                severity: 'info',
                icon: 'pi pi-bars',
                click: this.detailPersonnelAttendance(params),
              },
              {
                rounded: true,
                text: true,
                severity: 'warn',
                icon: 'pi pi-pencil',
                click: this.editPersonnelAttendance(params),
              },
              {
                rounded: true,
                text: true,
                severity: 'danger',
                icon: 'pi pi-trash',
                click: this.deletePersonnelAttendance(params),
              },
            ],
          },
        ],
      },
    ];
    this.columns$.next(columns);
  }
}
