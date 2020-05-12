import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TemplateRoutingModule} from './template-routing.module';
import {ListTemplateComponent} from './list-template/list-template.component';
import {CreateTemplateComponent} from './create-template/create-template.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditTemplateComponent} from './edit-template/edit-template.component';
import {DeleteTemplateComponent} from './delete-template/delete-template.component';
import {InfoTemplateComponent} from './info-template/info-template.component';

@NgModule({
  declarations: [
    ListTemplateComponent,
    CreateTemplateComponent,
    EditTemplateComponent,
    DeleteTemplateComponent,
    InfoTemplateComponent,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ReactiveFormsModule
  ]
})
export class TemplateModule { }
