import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoachRoutingModule} from './coach-routing.module';
import {ListCoachComponent} from './list-coach/list-coach.component';
import {CreateCoachComponent} from './create-coach/create-coach.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditCoachComponent} from './edit-coach/edit-coach.component';
import {DeleteCoachComponent} from './delete-coach/delete-coach.component';
import {InfoCoachComponent} from './info-coach/info-coach.component';



@NgModule({
  declarations: [
    ListCoachComponent,
    CreateCoachComponent,
    EditCoachComponent,
    DeleteCoachComponent,
    InfoCoachComponent,
  ],
  imports: [
    CommonModule,
    CoachRoutingModule,
    ReactiveFormsModule
  ]
})
export class CoachModule { }
