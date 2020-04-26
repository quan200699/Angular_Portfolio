import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListOutcomeComponent} from './list-outcome/list-outcome.component';
import {AuthGuard} from '../helper/auth-guard';
import {CreateOutcomeComponent} from './create-outcome/create-outcome.component';
import {AdminAuthGuard} from '../helper/admin-auth-guard';


const routes: Routes = [
  {
    path: '',
    component: ListOutcomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateOutcomeComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutcomeRoutingModule {
}
