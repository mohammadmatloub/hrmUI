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

  getAll(): Observable<PersonnelAttendance[]> {
    return this.http.get<PersonnelAttendance[]>(this.apiUrl);
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