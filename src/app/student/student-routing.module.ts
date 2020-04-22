import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListStudentComponent} from './list-student/list-student.component';
import {CreateStudentComponent} from './create-student/create-student.component';


const routes: Routes = [
  {
    path: '',
    component: ListStudentComponent
  },
  {
    path: 'create',
    component: CreateStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
