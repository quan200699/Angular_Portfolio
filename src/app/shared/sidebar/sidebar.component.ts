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

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
  }

  ngOnInit(): void {
  }

}
