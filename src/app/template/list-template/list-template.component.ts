import {Component, OnInit} from '@angular/core';
import {Template} from '../../model/template';
import {TemplateService} from '../../service/template/template.service';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/authentication/authentication.service';

declare var $: any;

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.css']
})
export class ListTemplateComponent implements OnInit {
  listTemplate: Template[];
  currentUser: UserToken;
  hasRoleAdmin = false;

  constructor(private templateService: TemplateService,
              private authenticationService: AuthenticationService) {
    this.getAllTemplate();
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
  }

  getAllTemplate() {
    this.templateService.getAllTemplate().subscribe(listTemplate => {
      this.listTemplate = listTemplate;
      $(function () {
        $('#table-template').DataTable({
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
