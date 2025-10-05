import {Occupation} from './occupation.model';

export interface PersonAttendanceReport{
  occupation:Occupation;
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
