import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coach} from '../model/coach';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private http: HttpClient) {
  }

  getAllCoach(): Observable<Coach[]> {
    return this.http.get<Coach[]>(API_URL + '/coaches');
  }

  getCoach(id: number): Observable<Coach> {
    return this.http.get<Coach>(API_URL + `/coaches/${id}`);
  }

  createNewCoach(coach: Coach): Observable<Coach> {
    return this.http.post<Coach>(API_URL + '/coaches', coach);
  }

  updateCoachInfo(id: number, coach: Coach): Observable<Coach> {
    return this.http.put(API_URL + `/coaches/${id}`, coach);
  }

  deleteCoach(id: number): Observable<Coach> {
    return this.http.delete<Coach>(API_URL + `/coaches/${id}`);
  }
}
