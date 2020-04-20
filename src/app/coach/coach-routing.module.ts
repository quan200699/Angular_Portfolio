import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCoachComponent} from './list-coach/list-coach.component';


const routes: Routes = [
  {
    path: '',
    component: ListCoachComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachRoutingModule {
}
