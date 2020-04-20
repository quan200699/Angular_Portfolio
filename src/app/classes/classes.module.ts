import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListClassComponent} from './list-class/list-class.component';
import {ClassesRoutingModule} from './classes-routing.module';


@NgModule({
  declarations: [
    ListClassComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule
  ]
})
export class ClassesModule {
}
