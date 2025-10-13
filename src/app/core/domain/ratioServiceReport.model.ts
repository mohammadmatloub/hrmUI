import {Month} from '../../core/domain/month.model';
import {Year} from './year.model';
import {Organization} from './organization.model';
export interface  RatioServiceSearch {
  yearID: number;
  yearName:String
  organizationID: number;
  organizationName :String;
  months: Month[];
  ratioReportType: RatioReportType;
}
export interface RatioServiceRes {
  categoryName: string;
  categoryCode: number;
  categoryID: number;
  ratioServiceResDetailWrappers:RatioServiceResDetail[];

}
export interface RatioServiceResDetail {
   organizationName:String,
   organizationID:number,
  count: number;
  countWith: number;
}

export enum RatioReportType {
  total,
  category,
  support,
  categoryType
}
