import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MedicalPerMonthReportSearch } from '../../core/domain/medicalPerMonthReportSearch.model';
import { MedicalPersonAttendanceMonthReport } from '../../core/domain/medicalPersonAttendanceMonthReport.model';

@Injectable({
  providedIn: 'root',
})
export class MedicalPerMonthsReportService {
  private apiUrl = '/api/medical-per-months-report';
  constructor(private http: HttpClient) {}

  getAll(
    search: MedicalPerMonthReportSearch
  ): Observable<MedicalPersonAttendanceMonthReport[]> {
    let test = this.http.post<MedicalPersonAttendanceMonthReport[]>(
      this.apiUrl,
      search
    );
    console.log(test.subscribe());
    return test;
  }
}
