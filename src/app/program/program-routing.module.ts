import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListProgramComponent} from './list-program/list-program.component';
import {AuthGuard} from '../helper/auth-guard';
import {CreateProgramComponent} from './create-program/create-program.component';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {EditProgramComponent} from './edit-program/edit-program.component';
import {InfoProgramComponent} from './info-program/info-program.component';


const routes: Routes = [
  {
    path: '',
    component: ListProgramComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateProgramComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:id',
    component: EditProgramComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'info/:id',
    component: InfoProgramComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule {
}
