import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListEvaluationComponent} from './list-evaluation/list-evaluation.component';
import {EvaluationRoutingModule} from './evaluation-routing.module';
import {CreateEvaluationComponent} from './create-evaluation/create-evaluation.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ListEvaluationComponent,
    CreateEvaluationComponent,
  ],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    ReactiveFormsModule
  ]
})
export class EvaluationModule { }
