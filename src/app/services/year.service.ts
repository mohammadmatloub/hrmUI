import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Year } from '../models/year.model';

@Injectable({
  providedIn: 'root'
})
export class YearService {
  private apiUrl = '/api/years';

 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Year[]> {
    return this.http.get<Year[]>(this.apiUrl);
  }

  getById(id: number): Observable<Year> {
    return this.http.get<Year>(`${this.apiUrl}/${id}`);
  }

  create(year: Year): Observable<Year> {
    return this.http.post<Year>(this.apiUrl, year);
  }

  update(id: number, year: Year): Observable<Year> {
    return this.http.put<Year>(`${this.apiUrl}/${id}`, year);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}