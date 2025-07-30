import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Occupation } from '../models/occupation.model';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {
  private apiUrl = '/api/occupations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Occupation[]> {
    return this.http.get<Occupation[]>(this.apiUrl);
  }

  getById(id: number): Observable<Occupation> {
    return this.http.get<Occupation>(`${this.apiUrl}/${id}`);
  }

  create(occupation: Occupation): Observable<Occupation> {
    return this.http.post<Occupation>(this.apiUrl, occupation);
  }

  update(id: number, occupation: Occupation): Observable<Occupation> {
    return this.http.put<Occupation>(`${this.apiUrl}/${id}`, occupation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}