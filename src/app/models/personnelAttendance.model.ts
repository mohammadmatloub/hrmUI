import { Department } from "./department.model";
import { Month } from "./month.model";
import { Occupation } from "./occupation.model";
import { Organization } from "./organization.model";
import { Year } from "./year.model";

export interface PersonnelAttendance {
  id?: number; // PanacheEntity includes `id` by default

  organization?: Organization;
  organizationId?: number;

  department?: Department;
  departmentId?: number;

  month?: Month;
  monthId?: number;

  year?: Year;
  yearId?: number;

  occupation?: Occupation;
  occupationId?: number;

  totalHoursWorked: number;
  totalMinutesWorked:number;
  totalWorked: number;

  overtimeWithMultiplier: number;
  overtimeWithOutMultiplier: number;

  overtimeDaysWorked:number;
  overtimeHoursWorked: number;
  overtimeMinWorked: number;
  overtimeTotalWorked: number;

  attendanceCount: number;
}
