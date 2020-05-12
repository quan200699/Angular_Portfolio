import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ListEvaluationComponent} from './list-evaluation/list-evaluation.component';
import {CreateEvaluationComponent} from './create-evaluation/create-evaluation.component';
import {EditEvaluationComponent} from './edit-evaluation/edit-evaluation.component';
import {DeleteEvaluationComponent} from './delete-evaluation/delete-evaluation.component';
import {InfoEvaluationComponent} from './info-evaluation/info-evaluation.component';
import {EvaluationFormComponent} from './evaluation-form/evaluation-form.component';


const routes: Routes = [
    {
      path: '',
      canActivate: [AuthGuard],
      component: ListEvaluationComponent
    },
    {
      path: 'create',
      canActivate: [AuthGuard],
      component: CreateEvaluationComponent
    },
    {
      path: 'edit/:id',
      canActivate: [AuthGuard],
      component: EditEvaluationComponent
    },
    {
      path: 'delete/:id',
      canActivate: [AuthGuard],
      component: DeleteEvaluationComponent
    },
    {
      path: 'info/:id',
      canActivate: [AuthGuard],
      component: InfoEvaluationComponent
    },
    {
      path: 'info/:id/form',
      component: EvaluationFormComponent,
      canActivate: [AuthGuard]
    }
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule {
}
