import { Department } from "./department.model";
import { Month } from "./month.model";
import { Occupation } from "./occupation.model";
import { Year } from "./year.model";

export interface PersonnelAttendance {
  id?: number; // PanacheEntity includes `id` by default

  department?: Department;
  departmentId: number;

  month?: Month;
  monthId: number;

  year?: Year;
  yearId: number;

  occupation?: Occupation;
  occupationId: number;

  totalHoursWorked: number;
  overtimeHoursWorked: number;
  overtimeMinWorked: number;
  overtimeWorked: number;
  attendanceCount: number;
}