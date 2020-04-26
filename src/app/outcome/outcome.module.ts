import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OutcomeRoutingModule} from './outcome-routing.module';
import {ListOutcomeComponent} from './list-outcome/list-outcome.component';
import {CreateOutcomeComponent} from './create-outcome/create-outcome.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditOutcomeComponent} from './edit-outcome/edit-outcome.component';


@NgModule({
  declarations: [
    ListOutcomeComponent,
    CreateOutcomeComponent,
    EditOutcomeComponent,
  ],
  imports: [
    CommonModule,
    OutcomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class OutcomeModule {
}
