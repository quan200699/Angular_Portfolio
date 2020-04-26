import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListOutcomeComponent} from './list-outcome/list-outcome.component';
import {AuthGuard} from '../helper/auth-guard';
import {CreateOutcomeComponent} from './create-outcome/create-outcome.component';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {EditOutcomeComponent} from './edit-outcome/edit-outcome.component';
import {DeleteOutcomeComponent} from './delete-outcome/delete-outcome.component';


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
  },
  {
    path: 'edit/:id',
    component: EditOutcomeComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'delete/:id',
    component: DeleteOutcomeComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutcomeRoutingModule {
}
