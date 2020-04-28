import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EvaluationFormComponent} from './evaluation-form.component';
import {AuthGuard} from '../helper/auth-guard';

const routes: Routes = [{
  path: '',
  component: EvaluationFormComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationFormRoutingModule {
}
