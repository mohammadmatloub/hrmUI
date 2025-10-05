import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Category} from '../../core/domain/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = '/api/categories';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    //create sample data

    //return sample data as an observable
    //return of(this.sampleData);
    //return this.http.get<Department[]>(this.apiUrl);
    return this.http.get<Category[]>(this.apiUrl);
  }
}
