import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Month } from '../models/month.model';

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  private apiUrl = '/api/months';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Month[]> {
    return this.http.get<Month[]>(this.apiUrl);
  }

  getById(id: number): Observable<Month> {
    return this.http.get<Month>(`${this.apiUrl}/${id}`);
  }

  create(month: Month): Observable<Month> {
    return this.http.post<Month>(this.apiUrl, month);
  }

  update(id: number, month: Month): Observable<Month> {
    return this.http.put<Month>(`${this.apiUrl}/${id}`, month);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}