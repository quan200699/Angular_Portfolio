import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Classes} from '../../model/classes';
import {Student} from '../../model/student';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient) {
  }

  getAllClasses(): Observable<Classes[]> {
    return this.http.get<Classes[]>(API_URL + '/classes');
  }

  getClasses(id: number): Observable<Classes> {
    return this.http.get<Classes>(API_URL + `/classes/${id}`);
  }

  createNewClasses(classes: Classes): Observable<Classes> {
    return this.http.post<Classes>(API_URL + `/classes`, classes);
  }

  updateClassesInfo(id: number, classes: Classes): Observable<Classes> {
    return this.http.put<Classes>(API_URL + `/classes/${id}`, classes);
  }

  deleteClasses(id: number): Observable<Classes> {
    return this.http.delete<Classes>(API_URL + `/classes/${id}`);
  }

  getAllStudentByClass(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(API_URL + `/classes/${id}/students`);
  }
}
