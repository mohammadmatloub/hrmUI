
import {Month} from '../../core/domain/month.model';
export interface MedicalPerMonthReportSearch {
  months?: Month[];
  yearID?: number;
  yearName?: string;
  organizationID?: number;
  organizationName?: string;
}
