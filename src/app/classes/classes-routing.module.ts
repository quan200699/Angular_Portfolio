import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListClassComponent} from './list-class/list-class.component';
import {CreateClassComponent} from './create-class/create-class.component';
import {EditClassComponent} from './edit-class/edit-class.component';
import {DeleteClassComponent} from './delete-class/delete-class.component';
import {AdminAuthGuard} from '../helper/admin-auth-guard';


const routes: Routes = [
  {
    path: '',
    component: ListClassComponent
  },
  {
    path: 'create',
    canActivate: [AdminAuthGuard],
    component: CreateClassComponent
  },
  {
    path: 'edit/:id',
    canActivate: [AdminAuthGuard],
    component: EditClassComponent,
  },
  {
    path: 'delete/:id',
    canActivate: [AdminAuthGuard],
    component: DeleteClassComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule {
}
