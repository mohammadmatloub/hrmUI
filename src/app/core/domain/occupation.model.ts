import {Department} from './department.model';

export interface Occupation {
  id?: number; // PanacheEntity provides 'id'
  name: string;
  code: number; // Java Long → TypeScript number
  approvedHeadcount: number;
  regulatoryOvertime: number;
  mandatoryShifts: number;
  department: Department;
}
