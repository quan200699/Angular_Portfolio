import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../model/student';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(API_URL + '/students');
  }
}
