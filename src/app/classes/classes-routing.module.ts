import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListClassComponent} from './list-class/list-class.component';
import {CreateClassComponent} from './create-class/create-class.component';
import {EditClassComponent} from './edit-class/edit-class.component';
import {DeleteClassComponent} from './delete-class/delete-class.component';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {AuthGuard} from '../helper/auth-guard';
import {InfoClassComponent} from './info-class/info-class.component';
import {AddStudentToClassComponent} from './add-student-to-class/add-student-to-class.component';


const routes: Routes = [
  {
    path: '',
    component: ListClassComponent,
    canActivate: [AuthGuard]
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
  },
  {
    path: 'info/:id',
    canActivate: [AuthGuard],
    component: InfoClassComponent
  },
  {
    path: 'info/:id/add-student',
    canActivate: [AdminAuthGuard],
    component: AddStudentToClassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule {
}
