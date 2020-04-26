import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkillRoutingModule} from './skill-routing.module';
import {ListSkillComponent} from './list-skill/list-skill.component';
import {CreateSkillComponent} from './create-skill/create-skill.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditSkillComponent} from './edit-skill/edit-skill.component';



@NgModule({
  declarations: [
    ListSkillComponent,
    CreateSkillComponent,
    EditSkillComponent,
  ],
  imports: [
    CommonModule,
    SkillRoutingModule,
    ReactiveFormsModule
  ]
})
export class SkillModule { }
