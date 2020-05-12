import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Template} from '../../model/template';
import {Evaluations} from '../../model/evaluations';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) {
  }

  getAllTemplate(): Observable<Template[]> {
    return this.http.get<Template[]>(API_URL + '/templates');
  }

  getAllEvaluationsByTemplate(id: number): Observable<Evaluations[]> {
    return this.http.get<Evaluations[]>(API_URL + `/templates/${id}/evaluations`);
  }

  createNewTemplate(template: Template): Observable<Template> {
    return this.http.post<Template>(API_URL + '/templates', template);
  }

  getTemplate(id: number): Observable<Template> {
    return this.http.get<Template>(API_URL + `/templates/${id}`);
  }

  updateTemplate(id: number, template: Template) {
    return this.http.put<Template>(API_URL + `/templates/${id}`, template);
  }

  deleteTemplate(id: number) {
    return this.http.delete<Template>(API_URL + `/templates/${id}`);
  }
}
