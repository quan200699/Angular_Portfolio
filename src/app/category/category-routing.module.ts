import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCategoryComponent} from './list-category/list-category.component';
import {AuthGuard} from '../helper/auth-guard';
import {CreateCategoryComponent} from './create-category/create-category.component';
import {AdminAuthGuard} from '../helper/admin-auth-guard';


const routes: Routes = [
  {
    path: '',
    component: ListCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateCategoryComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
