import { Month } from './month.model';
import { Service } from './service.model';
import { Year } from './year.model';
import { Organization } from './organization.model';

export interface MedicalPerMonth {
  id?: number;
  organization?: Organization;
  organizationID?: number;
  month?: Month;
  monthID?: number;
  yearID?: number;
  year?: Year;
  service?: Service;
  serviceID?: number;
  totalMedicalPerMonth: number;
}
