import { Department } from './department.model';
import { Month } from './month.model';
import { Occupation } from './occupation.model';
import { Organization } from './organization.model';
import { Year } from './year.model';

export interface PersonnelAttendance {
  id?: number; // PanacheEntity includes `id` by default

  organization?: Organization;
  organizationID?: number;

  month?: Month;
  monthID?: number;

  year?: Year;
  yearID?: number;

  occupation?: Occupation;
  occupationId?: number;

  totalDaysWorked:number;
  totalHoursWorked: number;
  totalMinutesWorked: number;
  totalWorked: number;

  overtimeDaysWorked: number;
  overtimeHoursWorked: number;
  overtimeMinWorked: number;
  overtimeTotalWorked: number;

  overtimeWithMultiplier: number;

  attendanceCount: number;
}
