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
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('../coach/coach.module').then(module => module.CoachModule)
  },
  {
    path: 'classes-management',
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('../classes/classes.module').then(module => module.ClassesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
