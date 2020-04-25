import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAuthGuard} from '../helper/admin-auth-guard';


const routes: Routes = [
  {
    path: 'student-management',
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('../student/student.module').then(module => module.StudentModule)
  },
  {
    path: 'coach-management',
    loadChildren: () => import('../coach/coach.module').then(module => module.CoachModule)
  },
  {
    path: 'program-management',
    loadChildren: () => import('../program/program.module').then(module => module.ProgramModule)
  },
  {
    path: 'classes-management',
    loadChildren: () => import('../classes/classes.module').then(module => module.ClassesModule)
  },
  {
    path: 'template-management',
    loadChildren: () => import('../template/template.module').then(module => module.TemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
