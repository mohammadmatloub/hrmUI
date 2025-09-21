import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { MedicalPerMonthReportSearch } from '../../core/domain/medicalPerMonthReportSearch.model';
import { PersonAttendanceReport } from '../../core/domain/personAttendanceReport.model';


@Injectable({
  providedIn: 'root',
})
export class PersonAttendanceReportService {
  private apiUrl = '/api/personnel-attendance-report';
  constructor(private http: HttpClient) {}

  getAll(
    search: MedicalPerMonthReportSearch
  ): Observable<PersonAttendanceReport[]> {
    let test = this.http.post<PersonAttendanceReport[]>(
      this.apiUrl,
      search
    );
    console.log(test.subscribe());
    return test;
  }
}