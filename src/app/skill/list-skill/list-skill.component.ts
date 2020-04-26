import {Component, OnInit} from '@angular/core';
import {Skill} from '../../model/skill';
import {SkillService} from '../../service/skill.service';
import {UserToken} from '../../model/user-token';
import {CategoryService} from '../../service/category.service';
import {AuthenticationService} from '../../service/authentication.service';

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
    });
  }
}
