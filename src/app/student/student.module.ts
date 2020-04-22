import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import {ListStudentComponent} from './list-student/list-student.component';
import {CreateStudentComponent} from './create-student/create-student.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ListStudentComponent,
    CreateStudentComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule
  ]
})
export class StudentModule {
}
