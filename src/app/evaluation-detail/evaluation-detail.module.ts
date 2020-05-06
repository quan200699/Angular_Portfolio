import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EvaluationDetailRoutingModule} from './evaluation-detail-routing.module';
import {ListEvaluationDetailComponent} from './list-evaluation-detail/list-evaluation-detail.component';



@NgModule({
  declarations: [
    ListEvaluationDetailComponent,
  ],
  imports: [
    CommonModule,
    EvaluationDetailRoutingModule
  ]
})
export class EvaluationDetailModule { }
