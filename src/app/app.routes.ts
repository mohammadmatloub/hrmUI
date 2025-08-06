import { Routes } from '@angular/router';
import { DepartmentList } from './components/department/department-list/department-list';
import { OrganizationList } from './components/organization/organization-list/organization-list';
import { ServiceList } from './components/service/service-list/service-list';
import { OccupationList } from './components/occupation/occupation-list/occupation-list';
import { YearList } from './components/year/year-list/year-list';
import { MonthList } from './components/month/month-list/month-list';
import { PersonnelAttendanceList } from './components/personnel-attendance/personnel-attendance-list/personnel-attendance-list';
import { MedicalPerMonthList } from './components/medical-per-month/medical-per-month-list/medical-per-month-list';
import { PersonnelMonthReport } from './components/personnel-month-report/personnel-month-report/personnel-month-report';
import { MedicalMonthReport } from './components/medical-month-report/medical-month-report/medical-month-report';

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
  { path: 'personnelMonthReport', component: PersonnelMonthReport }
];
