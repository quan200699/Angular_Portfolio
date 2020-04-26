import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OutcomeService} from '../../service/outcome.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-delete-outcome',
  templateUrl: './delete-outcome.component.html',
  styleUrls: ['./delete-outcome.component.css']
})
export class DeleteOutcomeComponent implements OnInit {
  id: number;
  title: string;
  sub: Subscription;

  constructor(private outcomeService: OutcomeService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getOutcome(id);
    });
  }

  ngOnInit() {
  }

  getOutcome(id: number) {
    this.outcomeService.getOutcome(id).subscribe(outcome => {
      this.id = outcome.id;
      this.title = outcome.title;
    });
  }

  deleteOutcome(id: number) {
    this.outcomeService.deleteOutcome(id).subscribe();
  }
}
