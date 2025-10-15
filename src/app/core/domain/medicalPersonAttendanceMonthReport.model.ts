import { MedicalPerMonthReport } from './medicalPerMonthReport.model';

export interface MedicalPersonAttendanceMonthReport {
  monthID: number;
  monthName: string;
  yearID: number;
  yearName: string;
  organizationID: number;
  organizationName: string;
   attendance : number;
   overtimeHoursWorked :number;
   overtimeMinutesWorked:number;
   overtimeWithHoursWorked :number;
   overtimeWithMinutesWorked:number;
  medicalPerMonthDTOList?: MedicalPerMonthReport[];
}
