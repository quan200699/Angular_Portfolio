import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListSkillComponent} from './list-skill/list-skill.component';
import {AuthGuard} from '../helper/auth-guard';


const routes: Routes = [
  {
    path: '',
    component: ListSkillComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillRoutingModule {
}
