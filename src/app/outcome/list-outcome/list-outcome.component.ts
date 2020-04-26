import {Component, OnInit} from '@angular/core';
import {Outcome} from '../../model/outcome';
import {OutcomeService} from '../../service/outcome.service';

@Component({
  selector: 'app-list-outcome',
  templateUrl: './list-outcome.component.html',
  styleUrls: ['./list-outcome.component.css']
})
export class ListOutcomeComponent implements OnInit {
  listOutcome: Outcome[];

  constructor(private outcomeService: OutcomeService) {
  }

  ngOnInit() {
    this.getALlOutcome();
  }

  getALlOutcome() {
    this.outcomeService.getAllOutcome().subscribe(listOutcome => {
      this.listOutcome = listOutcome;
    });
  }
}
