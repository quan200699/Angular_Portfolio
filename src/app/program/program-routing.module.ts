import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListProgramComponent} from './list-program/list-program.component';
import {AuthGuard} from '../helper/auth-guard';


const routes: Routes = [
  {
    path: '',
    component: ListProgramComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
