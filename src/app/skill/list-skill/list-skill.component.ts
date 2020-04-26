import {Component, OnInit} from '@angular/core';
import {Skill} from '../../model/skill';
import {SkillService} from '../../service/skill.service';

@Component({
  selector: 'app-list-skill',
  templateUrl: './list-skill.component.html',
  styleUrls: ['./list-skill.component.css']
})
export class ListSkillComponent implements OnInit {
  listSkill: Skill[];

  constructor(private skillService: SkillService) {
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
