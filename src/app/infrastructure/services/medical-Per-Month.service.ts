import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MedicalPerMonth } from '../../core/domain/medicalPerMonth.model';

@Injectable({
  providedIn: 'root',
})
export class MedicalPerMonthService {
  private apiUrl = '/api/medical-per-months';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MedicalPerMonth[]> {
    return this.http.get<MedicalPerMonth[]>(this.apiUrl);
  }

  getById(id: number): Observable<MedicalPerMonth> {
    return this.http.get<MedicalPerMonth>(`${this.apiUrl}/${id}`);
  }

  create(medicalPerMonth: MedicalPerMonth): Observable<MedicalPerMonth> {
    return this.http.post<MedicalPerMonth>(this.apiUrl, medicalPerMonth);
  }

  update(
    id: number,
    medicalPerMonth: MedicalPerMonth
  ): Observable<MedicalPerMonth> {
    return this.http.put<MedicalPerMonth>(
      `${this.apiUrl}/${id}`,
      medicalPerMonth
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
