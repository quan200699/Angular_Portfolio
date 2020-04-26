import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import {ListStudentComponent} from './list-student/list-student.component';
import {CreateStudentComponent} from './create-student/create-student.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditStudentComponent} from './edit-student/edit-student.component';
import {DeleteStudentComponent} from './delete-student/delete-student.component';


@NgModule({
  declarations: [
    ListStudentComponent,
    CreateStudentComponent,
    EditStudentComponent,
    DeleteStudentComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule
  ]
})
export class StudentModule {
}
