import {Occupation} from './occupation.model';

export interface PersonAttendanceReport{
  occupationName:String;
  occupationID:number;
  reportDetail:PersonAttendanceReportDetail[];
}




export interface PersonAttendanceReportDetail{
  occupationID:number,
    occupationName:string,
    attendanceCount:Number,
    totalWorked:Number,
    overtimeTotalWorked:String,
    overtimeWithMultiplier:String

}
