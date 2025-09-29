import { Month } from './month.model';
import { Service } from './service.model';
import { Year } from './year.model';
import { Organization } from './organization.model';

export interface MedicalPerMonthMaster {
  id?: number;
  organization?: Organization;
  organizationID?: number;
  month?: Month;
  monthID?: number;
  yearID?: number;
  year?: Year;
  medicalPerMonthDetails?: MedicalPerMonthDetail[];
}
export interface MedicalPerMonthDetail{
  id?: number;
  master?: MedicalPerMonthMaster;
  masterID?: number;
  service?: Service;
  serviceID?: number;
  totalMedicalPerMonth: number;
}
