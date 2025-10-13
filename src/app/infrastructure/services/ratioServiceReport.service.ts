import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RatioServiceRes, RatioServiceSearch} from '../../core/domain/ratioServiceReport.model';


@Injectable({
  providedIn: 'root',
})

export class RatioServiceReportService {
  private apiUrl = '/api/ratio-report';

  constructor(private http: HttpClient) {}

  getAll(
    search: RatioServiceSearch[]
  ): Observable<RatioServiceRes[]> {
    let test = this.http.post<RatioServiceRes[]>(
      this.apiUrl,
      search
    );
    console.log(test.subscribe());
    return test;
  }

}
