import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListStudentComponent} from './list-student/list-student.component';
import {StudentRoutingModule} from './student-routing.module';


@NgModule({
  declarations: [
    ListStudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule {
}
