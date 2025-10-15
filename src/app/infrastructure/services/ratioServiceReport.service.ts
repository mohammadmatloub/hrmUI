import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RatioReportType, RatioServiceRes, RatioServiceSearch} from '../../core/domain/ratioServiceReport.model';


@Injectable({
  providedIn: 'root',
})

export class RatioServiceReportService {
  private apiUrl = '/api/ratio-report';

  constructor(private http: HttpClient) {}

  getAll(search: RatioServiceSearch[],ratioReportType:RatioReportType): Observable<RatioServiceRes[]> {

    const params = new HttpParams().set('ratioReportType', ratioReportType.toString());

    return this.http.post<RatioServiceRes[]>(`${this.apiUrl}?${params.toString()}`, search);

  }

}
