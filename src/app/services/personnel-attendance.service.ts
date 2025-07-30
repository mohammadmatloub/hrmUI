import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { PersonnelAttendance } from '../models/personnelAttendance.model';

@Injectable({
  providedIn: 'root'
})
export class PersonnelAttendanceService {
  private apiUrl = '/api/personnel-attendances';

  constructor(private http: HttpClient) {}

  sampleData:PersonnelAttendance[] = [
    {
      id: 1,
      departmentId: 1,
      monthId: 1,
      month: {
        id: 1,
        name: 'January',
        code: 2023,
        monthNumber: 1,
      },
      yearId: 2023,
      year : {
        id: 2023,
        name: '2023',
        code: 2023,
      },
      occupationId: 1,
      occupation: {
        id: 1,
        name: 'Software Engineer',
        code: 2,
      },
      totalHoursWorked: 10,
      overtimeHoursWorked: 2,
      overtimeMinWorked: 30,
      overtimeWorked: 2.5,
      attendanceCount: 1
    },
    {
      id: 2,
      departmentId: 1,
      monthId: 2,
      month: {
        id: 2,
        name: 'February',
        code: 2023,
        monthNumber: 2,
      },
      yearId: 2023,
      year : {
        id: 2023,
        name: '2023',
        code: 2023,
      },
      occupationId: 1,
      occupation: {
        id: 1,
        name: 'Software Engineer',
        code: 2,
      },
      totalHoursWorked: 20,
      overtimeHoursWorked: 5,
      overtimeMinWorked: 60,
      overtimeWorked: 5.5,
      attendanceCount: 2
    },
    {
      id: 3,
      departmentId: 2,
      monthId: 1,
      month: {
        id: 1,
        name: 'January',
        code: 2023,
        monthNumber: 1,
      },
      yearId: 2023,
      year : {
        id: 2023,
        name: '2023',
        code: 2023,
      },
      occupationId: 2,
      occupation: {
        id: 2,
        name: 'Project Manager',
        code: 3,
      },
      totalHoursWorked: 15,
      overtimeHoursWorked: 3,
      overtimeMinWorked: 45,
      overtimeWorked: 3.75,
      attendanceCount: 1
    }
  ];

  getAll(): Observable<PersonnelAttendance[]> {
    //return this.http.get<PersonnelAttendance[]>(this.apiUrl);
    return of(this.sampleData); // For testing purposes, returning sample data
  }

  getById(id: number): Observable<PersonnelAttendance> {
    return this.http.get<PersonnelAttendance>(`${this.apiUrl}/${id}`);
  }

  create(attendance: PersonnelAttendance): Observable<PersonnelAttendance> {
    return this.http.post<PersonnelAttendance>(this.apiUrl, attendance);
  }

  update(id: number, attendance: PersonnelAttendance): Observable<PersonnelAttendance> {
    return this.http.put<PersonnelAttendance>(`${this.apiUrl}/${id}`, attendance);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}