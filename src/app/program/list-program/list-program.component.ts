import {Component, OnInit} from '@angular/core';
import {Program} from '../../model/program';
import {ProgramService} from '../../service/program.service';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-list-program',
  templateUrl: './list-program.component.html',
  styleUrls: ['./list-program.component.css']
})
export class ListProgramComponent implements OnInit {
  listProgram: Program[];
  currentUser: UserToken;
  hasRoleAdmin = false;

  constructor(private programService: ProgramService,
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
    this.getAllProgram();
  }

  getAllProgram() {
    this.programService.getAllProgram().subscribe(listProgram => {
      this.listProgram = listProgram;
    });
  }
}
