import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {UserToken} from '../../model/user-token';
import {Evaluations} from '../../model/evaluations';
import {CoachService} from '../../service/coach/coach.service';

declare var $: any;

@Component({
  selector: 'app-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.css']
})
export class ListEvaluationComponent implements OnInit {
  evaluationList: Evaluations[];
  currentUser: UserToken;

  constructor(private coachService: CoachService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.getAllEvaluation(this.currentUser.id);
    });
  }

  ngOnInit() {
  }

  getAllEvaluation(id: number) {
    return this.coachService.getAllEvaluationByCoach(id).subscribe(evaluationList => {
      this.evaluationList = evaluationList;
      $(function() {
        $('#table-evaluation').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false,
        });
      });
    });
  }
}
