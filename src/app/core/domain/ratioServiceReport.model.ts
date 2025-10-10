export interface  RatioServiceSearch {
  yearID: number;
  organizationID: number;
  monthID: number;
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
