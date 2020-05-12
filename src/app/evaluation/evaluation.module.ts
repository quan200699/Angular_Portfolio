import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListEvaluationComponent} from './list-evaluation/list-evaluation.component';
import {EvaluationRoutingModule} from './evaluation-routing.module';
import {CreateEvaluationComponent} from './create-evaluation/create-evaluation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditEvaluationComponent} from './edit-evaluation/edit-evaluation.component';
import {DeleteEvaluationComponent} from './delete-evaluation/delete-evaluation.component';
import {InfoEvaluationComponent} from './info-evaluation/info-evaluation.component';
import {EvaluationFormComponent} from './evaluation-form/evaluation-form.component';
import {CreateEvaluationDetailComponent} from './create-evaluation-detail/create-evaluation-detail.component';



@NgModule({
  declarations: [
    ListEvaluationComponent,
    CreateEvaluationComponent,
    EditEvaluationComponent,
    DeleteEvaluationComponent,
    InfoEvaluationComponent,
    EvaluationFormComponent,
    CreateEvaluationDetailComponent,
  ],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EvaluationModule { }
