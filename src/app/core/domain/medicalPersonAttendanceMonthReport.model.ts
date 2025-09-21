import { MedicalPerMonthReport } from './medicalPerMonthReport.model';

export interface MedicalPersonAttendanceMonthReport {
  monthID: number;
  monthName: string;
  yearID: number;
  yearName: string;
  organizationID: number;
  organizationName: string;
  totalPerson: number;
  totalOverTime: number;
  medicalPerMonthDTOList?: MedicalPerMonthReport[];
}
