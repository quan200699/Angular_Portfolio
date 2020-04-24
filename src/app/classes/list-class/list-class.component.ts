import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClassesService} from '../../service/classes.service';
import {Classes} from '../../model/classes';
import {AuthenticationService} from '../../service/authentication.service';
import {CoachService} from '../../service/coach.service';
import {UserToken} from '../../model/user-token';

declare var $: any;

@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.component.html',
  styleUrls: ['./list-class.component.css']
})
export class ListClassComponent implements OnInit {
  listClass: Classes[];
  currentUser: UserToken;
  hasRoleAdmin = false;

  constructor(private classesService: ClassesService,
              private authenticationService: AuthenticationService,
              private coachService: CoachService,
              private chRef: ChangeDetectorRef) {
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
    if (this.hasRoleAdmin) {
      this.getAllClass();
    } else {
      this.getAllClassByCoach(this.currentUser.id);
    }
  }

  getAllClass() {
    this.classesService.getAllClasses().subscribe(listClass => {
      this.listClass = listClass;
      this.chRef.detectChanges();
      for (let i = 0; i < this.listClass.length; i++) {
        this.numberOfStudentInClass(listClass[i]);
      }
      $(function() {
        $('#table-class').DataTable({
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

  getAllClassByCoach(id: number) {
    this.coachService.getAllClassByCoach(id).subscribe(listClass => {
      this.listClass = listClass;
      for (let i = 0; i < this.listClass.length; i++) {
        this.numberOfStudentInClass(listClass[i]);
      }
    });
  }

  numberOfStudentInClass(classes: Classes) {
    this.classesService.getAllStudentByClass(classes.id).subscribe(listStudent => {
      classes.students = listStudent;
    });
  }
}
