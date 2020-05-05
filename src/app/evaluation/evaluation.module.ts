import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListEvaluationComponent} from './list-evaluation/list-evaluation.component';
import {EvaluationRoutingModule} from './evaluation-routing.module';



@NgModule({
  declarations: [
    ListEvaluationComponent,
  ],
  imports: [
    CommonModule,
    EvaluationRoutingModule
  ]
})
export class EvaluationModule { }
