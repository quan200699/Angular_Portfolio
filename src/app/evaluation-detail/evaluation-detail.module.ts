import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EvaluationDetailRoutingModule} from './evaluation-detail-routing.module';
import {ListEvaluationDetailComponent} from './list-evaluation-detail/list-evaluation-detail.component';
import {CreateEvaluationDetailComponent} from './create-evaluation-detail/create-evaluation-detail.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ListEvaluationDetailComponent,
    CreateEvaluationDetailComponent,
  ],
  imports: [
    CommonModule,
    EvaluationDetailRoutingModule,
    ReactiveFormsModule
  ]
})
export class EvaluationDetailModule { }
