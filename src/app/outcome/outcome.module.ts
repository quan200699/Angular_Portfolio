import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OutcomeRoutingModule} from './outcome-routing.module';
import {ListOutcomeComponent} from './list-outcome/list-outcome.component';


@NgModule({
  declarations: [
    ListOutcomeComponent
  ],
  imports: [
    CommonModule,
    OutcomeRoutingModule
  ]
})
export class OutcomeModule {
}
