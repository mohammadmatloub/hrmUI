import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Organization } from '../../core/domain/organization.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private apiUrl = '/api/organizations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.apiUrl);
  }

  getById(id: number): Observable<Organization> {
    return this.http.get<Organization>(`${this.apiUrl}/${id}`);
  }

  create(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>(this.apiUrl, organization);
  }

  update(id: number, organization: Organization): Observable<Organization> {
    return this.http.put<Organization>(`${this.apiUrl}/${id}`, organization);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
