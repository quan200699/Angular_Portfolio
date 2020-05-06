import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ListEvaluationDetailComponent} from './list-evaluation-detail/list-evaluation-detail.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListEvaluationDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationDetailRoutingModule {
}
