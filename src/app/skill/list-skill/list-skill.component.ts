import {Component, OnInit} from '@angular/core';
import {Skill} from '../../model/skill';
import {SkillService} from '../../service/skill/skill.service';
import {UserToken} from '../../model/user-token';
import {CategoryService} from '../../service/category/category.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';

declare var $: any;

@Component({
  selector: 'app-list-skill',
  templateUrl: './list-skill.component.html',
  styleUrls: ['./list-skill.component.css']
})
export class ListSkillComponent implements OnInit {
  listSkill: Skill[];
  currentUser: UserToken;
  hasRoleAdmin = false;

  constructor(private skillService: SkillService,
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
    this.getAllSkill();
  }

  getAllSkill() {
    this.skillService.getAllSkill().subscribe(listSkill => {
      this.listSkill = listSkill;

      $(function() {
        $('#table-skill').DataTable({
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
