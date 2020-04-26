import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListStudentComponent} from './list-student/list-student.component';
import {CreateStudentComponent} from './create-student/create-student.component';
import {EditStudentComponent} from './edit-student/edit-student.component';


const routes: Routes = [
  {
    path: '',
    component: ListStudentComponent
  },
  {
    path: 'create',
    component: CreateStudentComponent
  },
  {
    path: 'edit/:id',
    component: EditStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
