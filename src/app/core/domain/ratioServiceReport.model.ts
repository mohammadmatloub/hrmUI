import {Month} from '../../core/domain/month.model';
export interface  RatioServiceSearch {
  yearID: number;
  organizationID: number;
  months: Month[];
  ratioReportType: RatioReportType;
}
export interface RatioServiceRes {
  categoryName: string;
  categoryCode: number;
  categoryID: number;
  monthID: number;
  monthName: string;
  count: number;
  countWith: number;
}

export enum RatioReportType {
  total,
  category,
  support,
  categoryType
}
