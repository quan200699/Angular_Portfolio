import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Evaluations} from '../../model/evaluations';
import {EvaluationDetail} from '../../model/evaluation-detail';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient) {
  }

  getAllEvaluation(): Observable<Evaluations[]> {
    return this.http.get<Evaluations[]>(API_URL + '/evaluations');
  }

  getAllEvaluationDetailByEvaluation(id: number): Observable<EvaluationDetail[]> {
    return this.http.get<EvaluationDetail[]>(API_URL + `/evaluations/${id}/details`);
  }

  getEvaluation(id: number): Observable<Evaluations> {
    return this.http.get<Evaluations>(API_URL + `/evaluations/${id}`);
  }

  createNewEvaluation(evaluations: Evaluations): Observable<Evaluations> {
    return this.http.post<Evaluations>(API_URL + '/evaluations', evaluations);
  }

  updateEvaluationInfo(id: number, evaluations: Evaluations): Observable<Evaluations> {
    return this.http.put(API_URL + `/evaluations/${id}`, evaluations);
  }

  deleteEvaluation(id: number): Observable<Evaluations> {
    return this.http.delete<Evaluations>(API_URL + `/evaluations/${id}`);
  }
}
