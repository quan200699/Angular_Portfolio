import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SkillService} from '../../service/skill.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-delete-skill',
  templateUrl: './delete-skill.component.html',
  styleUrls: ['./delete-skill.component.css']
})
export class DeleteSkillComponent implements OnInit {
  id: number;
  name: string;
  sub: Subscription;

  constructor(private skillService: SkillService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getSkill(id);
    });
  }

  ngOnInit() {
  }

  getSkill(id: number) {
    this.skillService.getSkill(id).subscribe(skill => {
      this.name = skill.name;
      this.id = skill.id;
    });
  }

  deleteSkill(id: number) {
    this.skillService.deleteSkill(id).subscribe();
  }
}
