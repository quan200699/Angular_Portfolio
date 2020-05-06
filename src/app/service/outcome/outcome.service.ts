import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Outcome} from '../../model/outcome';
import {Category} from '../../model/category';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class OutcomeService {

  constructor(private http: HttpClient) {
  }

  getAllOutcome(): Observable<Outcome[]> {
    return this.http.get<Outcome[]>(API_URL + '/outcomes');
  }

  createNewOutcome(outcome: Outcome): Observable<Outcome> {
    return this.http.post<Outcome>(API_URL + '/outcomes', outcome);
  }

  getOutcome(id: number): Observable<Outcome> {
    return this.http.get<Outcome>(API_URL + `/outcomes/${id}`);
  }

  editOutcome(id: number, outcome: Outcome): Observable<Outcome> {
    return this.http.put<Outcome>(API_URL + `/outcomes/${id}`, outcome);
  }

  deleteOutcome(id: number): Observable<Outcome> {
    return this.http.delete<Outcome>(API_URL + `/outcomes/${id}`);
  }

  findByTitle(name: string): Observable<Outcome> {
    return this.http.get<Outcome>(API_URL + '/outcomes/name?name=' + name);
  }

  getAllCategoryByOutcome(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL + `/outcomes/${id}/categories`);
  }
}
