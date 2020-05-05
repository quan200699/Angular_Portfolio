import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ListEvaluationComponent} from './list-evaluation/list-evaluation.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListEvaluationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule {
}
