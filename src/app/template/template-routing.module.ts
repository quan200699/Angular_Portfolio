import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ListTemplateComponent} from './list-template/list-template.component';
import {CreateTemplateComponent} from './create-template/create-template.component';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {EditTemplateComponent} from './edit-template/edit-template.component';
import {DeleteTemplateComponent} from './delete-template/delete-template.component';
import {InfoTemplateComponent} from './info-template/info-template.component';


const routes: Routes = [
  {
    path: '',
    component: ListTemplateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: CreateTemplateComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:id',
    component: EditTemplateComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'delete/:id',
    component: DeleteTemplateComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'info/:id',
    component: InfoTemplateComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule {
}
