import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MedicalPerMonthMaster,MedicalPerMonthDetail } from '../../core/domain/medicalPerMonth.model';

@Injectable({
  providedIn: 'root',
})
export class MedicalPerMonthService {
  private apiUrl = '/api/medical-per-months';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MedicalPerMonthMaster[]> {
    return this.http.get<MedicalPerMonthMaster[]>(this.apiUrl);
  }

  getById(id: number): Observable<MedicalPerMonthMaster> {
    return this.http.get<MedicalPerMonthMaster>(`${this.apiUrl}/${id}`);
  }
  getDetailById(id: number): Observable<MedicalPerMonthDetail[]> {
    return this.http.get<MedicalPerMonthDetail[]>(`${this.apiUrl}/detail/${id}`);
  }

  create(medicalPerMonth: MedicalPerMonthMaster): Observable<MedicalPerMonthMaster> {
    return this.http.post<MedicalPerMonthMaster>(this.apiUrl, medicalPerMonth);
  }

  update(
    id: number,
    medicalPerMonth: MedicalPerMonthMaster
  ): Observable<MedicalPerMonthMaster> {
    return this.http.put<MedicalPerMonthMaster>(
      `${this.apiUrl}/${id}`,
      medicalPerMonth
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
