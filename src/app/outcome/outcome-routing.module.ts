import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListOutcomeComponent} from './list-outcome/list-outcome.component';
import {AuthGuard} from '../helper/auth-guard';


const routes: Routes = [
  {
    path: '',
    component: ListOutcomeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutcomeRoutingModule {
}
