import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListSkillComponent} from './list-skill/list-skill.component';
import {AuthGuard} from '../helper/auth-guard';
import {CreateSkillComponent} from './create-skill/create-skill.component';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {EditSkillComponent} from './edit-skill/edit-skill.component';


const routes: Routes = [
  {
    path: '',
    component: ListSkillComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateSkillComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:id',
    component: EditSkillComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillRoutingModule {
}
