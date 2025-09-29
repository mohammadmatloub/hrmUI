import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { PersonnelAttendanceMaster,PersonnelAttendanceDetail } from '../../core/domain/personnelAttendance.model';

@Injectable({
  providedIn: 'root',
})
export class PersonnelAttendanceService {
  private apiUrl = '/api/personnel-attendances';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PersonnelAttendanceMaster[]> {
    return this.http.get<PersonnelAttendanceMaster[]>(this.apiUrl);
  }

  getById(id: number): Observable<PersonnelAttendanceMaster> {
    return this.http.get<PersonnelAttendanceMaster>(`${this.apiUrl}/${id}`);
  }
  getDetailById(id: number): Observable<PersonnelAttendanceDetail[]> {
    return this.http.get<PersonnelAttendanceDetail[]>(`${this.apiUrl}/detail/${id}`);
  }

  create(attendance: PersonnelAttendanceMaster): Observable<PersonnelAttendanceMaster> {
    return this.http.post<PersonnelAttendanceMaster>(this.apiUrl, attendance);
  }

  update(
    id: number,
    attendance: PersonnelAttendanceMaster
  ): Observable<PersonnelAttendanceMaster> {
    return this.http.put<PersonnelAttendanceMaster>(
      `${this.apiUrl}/${id}`,
      attendance
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
