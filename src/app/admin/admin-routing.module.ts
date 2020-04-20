import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {ListCoachComponent} from '../coach/list-coach/list-coach.component';


const routes: Routes = [
  {
    path: 'student-management',
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('../student/student.module').then(module => module.StudentModule)
  },
  {
    path: 'coach-management',
    component: ListCoachComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
