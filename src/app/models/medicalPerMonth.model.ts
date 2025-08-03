import { Month } from "./month.model";
import { Service } from "./service.model";
import { Year } from "./year.model";

export interface MedicalPerMonth {
  id?: number;
  month: Month;
  monthId: number;
  yearId: number;
  year: Year;
  service: Service;
  serviceId: number;
  totalMedicalPerMonth: number; 
}