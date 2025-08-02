import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, sample } from 'rxjs';
import { Department } from '../models/department.model';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private apiUrl = '/api/departments';


  constructor(private http: HttpClient) {}

  getAll(): Observable<Department[]> {
    //create sample data
    
    //return sample data as an observable
    //return of(this.sampleData);
    //return this.http.get<Department[]>(this.apiUrl);
    return this.http.get<Department[]>(this.apiUrl);
  }
  
  getById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  create(department: Department): Observable<Department> {
    // this.sampleData.push(department)
    // return of (department);
    return this.http.post<Department>(this.apiUrl, department);
  }

  update(id: number, department: Department): Observable<Department> {
  //   const dep = this.sampleData.find(dep => dep.id === id);
  //   if (dep) {
  //   // Update its properties only if found
  //   Object.assign(dep, department); 
  //   return of(dep); // Return the updated department
  // } else {
  //   // Not found: you may want to handle this differently
  //   return of(  { id: 0, name: '', code:0 });
  // }

    return this.http.put<Department>(`${this.apiUrl}/${id}`, department);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}