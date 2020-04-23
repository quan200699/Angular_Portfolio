import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListProgramComponent} from './list-program/list-program.component';
import {ProgramRoutingModule} from './program-routing.module';
import {CreateProgramComponent} from './create-program/create-program.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ListProgramComponent,
    CreateProgramComponent,
  ],
  exports: [
    ListProgramComponent,
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProgramModule { }
