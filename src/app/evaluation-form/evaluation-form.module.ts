import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EvaluationFormComponent} from './evaluation-form.component';
import {EvaluationFormRoutingModule} from './evaluation-form-routing.module';

@NgModule({
  declarations: [
    EvaluationFormComponent,
  ],
  imports: [
    CommonModule,
    EvaluationFormRoutingModule
  ]
})
export class EvaluationFormModule {
}
