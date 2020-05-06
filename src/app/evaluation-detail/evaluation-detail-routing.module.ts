import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ListEvaluationDetailComponent} from './list-evaluation-detail/list-evaluation-detail.component';
import {CreateEvaluationDetailComponent} from './create-evaluation-detail/create-evaluation-detail.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListEvaluationDetailComponent
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateEvaluationDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationDetailRoutingModule {
}
