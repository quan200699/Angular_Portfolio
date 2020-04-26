import {Component, OnInit} from '@angular/core';
import {Outcome} from '../../model/outcome';
import {OutcomeService} from '../../service/outcome.service';
import {UserToken} from '../../model/user-token';
import {TemplateService} from '../../service/template.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-list-outcome',
  templateUrl: './list-outcome.component.html',
  styleUrls: ['./list-outcome.component.css']
})
export class ListOutcomeComponent implements OnInit {
  listOutcome: Outcome[];
  currentUser: UserToken;
  hasRoleAdmin = false;

  constructor(private outcomeService: OutcomeService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      for (const role of roleList) {
        if (role.authority === 'ADMIN') {
          this.hasRoleAdmin = true;
        }
      }
    }
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
