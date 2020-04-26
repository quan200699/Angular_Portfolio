import {Component, OnInit} from '@angular/core';
import {Skill} from '../../model/skill';
import {Category} from '../../model/category';
import {Subscription} from 'rxjs';
import {SkillService} from '../../service/skill.service';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  skillForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    categories: new FormControl()
  });
  skill: Skill;
  skillCategory: Category;
  sub: Subscription;
  listCategory: Category[];
  id: number;

  constructor(private skillService: SkillService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getSkill(id);
    });
    this.getAllCategory();
  }

  ngOnInit() {
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(listCategory => {
      this.listCategory = listCategory;
    });
  }

  getSkill(id: number) {
    this.skillService.getSkill(id).subscribe(skill => {
      this.skill = skill;
      this.skillCategory = skill.categories;
      this.id = skill.id;
    });
  }

  updateSkillInfo(id: number) {
    const skill: Skill = {
      id: this.skillForm.value.id,
      name: this.skillForm.value.name === '' ? this.skill.name : this.skillForm.value.name,
      categories: {
        id: this.skillForm.value.categories === null ? this.skillCategory.id : this.skillForm.value.categories
      }
    };
    this.skillService.editSkill(id, skill).subscribe();
  }
}
