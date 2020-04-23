import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListProgramComponent} from './list-program/list-program.component';
import {ProgramRoutingModule} from './program-routing.module';



@NgModule({
  declarations: [
    ListProgramComponent,
  ],
  exports: [
    ListProgramComponent
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule
  ]
})
export class ProgramModule { }
