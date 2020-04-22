import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {Coach} from '../../model/coach';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: UserToken;
  user: Coach;
  hasRoleAdmin = false;

  constructor(
    private router: Router,
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

  ngOnInit(): void {
  }

}
