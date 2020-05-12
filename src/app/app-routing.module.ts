import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LayoutWithSharedComponent} from './layout/layout-with-shared/layout-with-shared.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutWithSharedComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
      },
      {
        path: 'coach',
        loadChildren: () => import('./coach/coach.module').then(module => module.CoachModule)
      },
      {
        path: 'evaluation',
        loadChildren: () => import('./evaluation/evaluation.module').then(module => module.EvaluationModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
