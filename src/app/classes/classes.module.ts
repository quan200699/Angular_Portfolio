import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListClassComponent} from './list-class/list-class.component';
import {ClassesRoutingModule} from './classes-routing.module';
import {CreateClassComponent} from './create-class/create-class.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditClassComponent} from './edit-class/edit-class.component';
import {DeleteClassComponent} from './delete-class/delete-class.component';
import {InfoClassComponent} from './info-class/info-class.component';


@NgModule({
  declarations: [
    ListClassComponent,
    CreateClassComponent,
    EditClassComponent,
    DeleteClassComponent,
    InfoClassComponent,
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ClassesModule {
}
