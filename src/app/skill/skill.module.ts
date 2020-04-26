import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkillRoutingModule} from './skill-routing.module';
import {ListSkillComponent} from './list-skill/list-skill.component';



@NgModule({
  declarations: [
    ListSkillComponent,
  ],
  imports: [
    CommonModule,
    SkillRoutingModule
  ]
})
export class SkillModule { }
