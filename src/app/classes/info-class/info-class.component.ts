import {Component, OnInit} from '@angular/core';
import {Student} from '../../model/student';
import {Subscription} from 'rxjs';
import {ClassesService} from '../../service/classes/classes.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {UserToken} from '../../model/user-token';

declare var $: any;

@Component({
  selector: 'app-info-class',
  templateUrl: './info-class.component.html',
  styleUrls: ['./info-class.component.css']
})
export class InfoClassComponent implements OnInit {
  studentList: Student[];
  sub: Subscription;
  className: string;
  currentUser: UserToken;
  hasRoleAdmin = false;


  constructor(private classesService: ClassesService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getClassInfo(id);
      this.getAllStudentByClass(id);
    });
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
  }

  getClassInfo(id: number) {
    this.classesService.getClasses(id).subscribe(classes => {
      this.className = classes.name;
    });
  }

  getAllStudentByClass(id: number) {
    this.classesService.getAllStudentByClass(id).subscribe(studentList => {
      this.studentList = studentList;
      $(function() {
        $('#table-student').DataTable({
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
