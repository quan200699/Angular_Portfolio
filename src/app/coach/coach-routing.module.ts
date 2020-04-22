import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCoachComponent} from './list-coach/list-coach.component';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {CreateCoachComponent} from './create-coach/create-coach.component';
import {EditCoachComponent} from './edit-coach/edit-coach.component';
import {DeleteCoachComponent} from './delete-coach/delete-coach.component';
import {InfoCoachComponent} from './info-coach/info-coach.component';


const routes: Routes = [
  {
    path: '',
    component: ListCoachComponent
  },
  {
    path: 'create',
    component: CreateCoachComponent
  },
  {
    path: 'edit/:id',
    component: EditCoachComponent
  },
  {
    path: 'delete/:id',
    component: DeleteCoachComponent
  },
  {
    path: 'info/:id',
    component: InfoCoachComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachRoutingModule {
}
