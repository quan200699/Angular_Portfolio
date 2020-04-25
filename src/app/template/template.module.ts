import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TemplateRoutingModule} from './template-routing.module';
import {ListTemplateComponent} from './list-template/list-template.component';
import {CreateTemplateComponent} from './create-template/create-template.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ListTemplateComponent,
    CreateTemplateComponent,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ReactiveFormsModule
  ]
})
export class TemplateModule { }
