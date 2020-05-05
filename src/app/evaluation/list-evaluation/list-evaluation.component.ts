import {Component, OnInit} from '@angular/core';
import {EvaluationService} from '../../service/evaluation/evaluation.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {UserToken} from '../../model/user-token';
import {Evaluations} from '../../model/evaluations';

declare var $: any;

@Component({
  selector: 'app-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.css']
})
export class ListEvaluationComponent implements OnInit {
  evaluationList: Evaluations[];
  currentUser: UserToken;

  constructor(private evaluationService: EvaluationService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
  }

  ngOnInit() {
    this.getAllEvaluation();
  }

  getAllEvaluation() {
    return this.evaluationService.getAllEvaluation().subscribe(evaluationList => {
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
