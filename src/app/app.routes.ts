import { Routes } from '@angular/router';

import { DepartmentList } from './presentation/components/department/department-list/department-list';
import { OrganizationList } from './presentation/components/organization/organization-list/organization-list';
import { ServiceList } from './presentation/components/service/service-list/service-list';
import { OccupationList } from './presentation/components/occupation/occupation-list/occupation-list';
import { YearList } from './presentation/components/year/year-list/year-list';
import { MonthList } from './presentation/components/month/month-list/month-list';
import { PersonnelAttendanceList } from './presentation/components/personnel-attendance/personnel-attendance-list/personnel-attendance-list';
import { MedicalPerMonthList } from './presentation/components/medical-per-month/medical-per-month-list/medical-per-month-list';
import { MedicalMonthReport } from './presentation/components/medical-month-report/medical-month-report/medical-month-report';
import { PersonnelMonthReport } from './presentation/components/personnel-month-report/personnel-month-report/personnel-month-report';

export const routes: Routes = [
  { path: 'departments', component: DepartmentList },
  { path: 'organizations', component: OrganizationList },
  { path: 'services', component: ServiceList },
  { path: 'occupations', component: OccupationList },
  { path: 'years', component: YearList },
  { path: 'months', component: MonthList },
  { path: 'personnelAttendance', component: PersonnelAttendanceList },
  { path: 'medicalPerMonth', component: MedicalPerMonthList },
  { path: 'medicalMonthReport', component: MedicalMonthReport },
  { path: 'personnelMonthReport', component: PersonnelMonthReport },
];
