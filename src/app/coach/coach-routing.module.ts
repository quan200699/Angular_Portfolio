import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCoachComponent} from './list-coach/list-coach.component';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {CreateCoachComponent} from './create-coach/create-coach.component';


const routes: Routes = [
  {
    path: '',
    component: ListCoachComponent
  },
  {
    path: 'create',
    component: CreateCoachComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachRoutingModule {
}
