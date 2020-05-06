import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../model/category';
import {Skill} from '../../model/skill';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL + '/categories');
  }

  createNewCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(API_URL + '/categories', category);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(API_URL + `/categories/${id}`);
  }

  editCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(API_URL + `/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(API_URL + `/categories/${id}`);
  }

  findByCategoryName(name: string): Observable<Category> {
    return this.http.get<Category>(API_URL + '/categories/name?name=' + name);
  }

  getAllSkillByCategory(id: number): Observable<Skill[]> {
    return this.http.get<Skill[]>(API_URL + `/categories/${id}/skills`);
  }
}
