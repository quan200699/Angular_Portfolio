import {Component, OnInit} from '@angular/core';
import {Coach} from '../../model/coach';
import {CoachService} from '../../service/coach/coach.service';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/authentication/authentication.service';

declare var $: any;

@Component({
  selector: 'app-list-coach',
  templateUrl: './list-coach.component.html',
  styleUrls: ['./list-coach.component.css']
})
export class ListCoachComponent implements OnInit {
  coachList: Coach[];
  currentUser: UserToken;
  hasRoleAdmin = false;

  constructor(private coachService: CoachService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      for (const role of roleList) {
        if (role.authority === 'ROLE_ADMIN') {
          this.hasRoleAdmin = true;
        }
      }
    }
  }

  ngOnInit() {
    this.getAllCoach();
  }

  getAllCoach() {
    return this.coachService.getAllCoach().subscribe(listCoach => {
      this.coachList = listCoach;
      $(function () {
        $('#table-coach').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": true,
          "info": true,
          "autoWidth": false,
        });
      });
    });
  }
}
