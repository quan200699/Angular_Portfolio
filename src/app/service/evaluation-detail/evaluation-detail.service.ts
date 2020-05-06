import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EvaluationDetail} from '../../model/evaluation-detail';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class EvaluationDetailService {

  constructor(private http: HttpClient) {
  }

  getAllEvaluationDetail(): Observable<EvaluationDetail[]> {
    return this.http.get<EvaluationDetail[]>(API_URL + '/evaluationDetails');
  }

  getEvaluationDetail(id: number): Observable<EvaluationDetail> {
    return this.http.get<EvaluationDetail>(API_URL + `/evaluationDetails/${id}`);
  }

  createNewEvaluationDetail(evaluationDetail: EvaluationDetail): Observable<EvaluationDetail> {
    return this.http.post<EvaluationDetail>(API_URL + '/evaluationDetails', evaluationDetail);
  }

  editEvaluationDetail(id: number, evaluationDetail: EvaluationDetail): Observable<EvaluationDetail> {
    return this.http.put(API_URL + `/evaluationDetails/${id}`, evaluationDetail);
  }

  deleteEvaluationDetail(id: number): Observable<EvaluationDetail> {
    return this.http.delete<EvaluationDetail>(API_URL + `/evaluationDetails/${id}`);
  }
}
