import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ListEvaluationComponent} from './list-evaluation/list-evaluation.component';
import {CreateEvaluationComponent} from './create-evaluation/create-evaluation.component';
import {EditEvaluationComponent} from './edit-evaluation/edit-evaluation.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListEvaluationComponent
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateEvaluationComponent
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    component: EditEvaluationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule {
}
