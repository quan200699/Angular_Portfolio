import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListStudentComponent} from './list-student/list-student.component';
import {AdminAuthGuard} from '../helper/admin-auth-guard';


const routes: Routes = [
  {
    path: '',
    component: ListStudentComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
