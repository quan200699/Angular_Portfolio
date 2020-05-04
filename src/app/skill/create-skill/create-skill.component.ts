import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Skill} from '../../model/skill';
import {SkillService} from '../../service/skill/skill.service';
import {CategoryService} from '../../service/category/category.service';

declare var $: any;

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.css']
})
export class CreateSkillComponent implements OnInit {
  copyFromWordForm: FormGroup = new FormGroup({
    data: new FormControl('')
  });

  constructor(private skillService: SkillService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#skill-form').validate({
        rules: {
          data: {
            required: true
          }
        },
        messages: {
          data: {
            required: 'Hãy nhập dữ liệu'
          }
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
          error.addClass('invalid-feedback');
          element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
          $(element).addClass('is-invalid');
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).removeClass('is-invalid');
        }
      });
    });
  }

  createSkill(skillRow: string) {
    let listCategory = this.getCategoryName();
    let row = skillRow.split("\t");
    const skill: Skill = {
      skillId: row[0].trim(),
      name: row[1].trim()
    };
    for (let category of listCategory) {
      const categoryRow = category.split('\t');
      const skillId = skillRow.substring(0, 3);
      if (skillId === categoryRow[0]) {
        this.categoryService.findByCategoryName(categoryRow[1].trim()).subscribe(category => {
          skill.categories = category;
          if (skill.name != '') {
            this.skillService.createNewSkill(skill).subscribe(() => {
              this.copyFromWordForm.reset();
            });
          }
        });
      }
    }
  }

  createManySkill() {
    let data = this.copyFromWordForm.value.data;
    let listSkill;
    let isSkill = /[1-9].[0-9]{1,2}.[0-9]{1,2}/;
    listSkill = data.split('\n');
    for (let skill of listSkill) {
      if (isSkill.test(skill)) {
        this.createSkill(skill);
      }
    }
  }

  getCategoryName(): string[] {
    let data = this.copyFromWordForm.value.data;
    let listCategory;
    let categoryName = [];
    let isSkill = /[1-9].[0-9]{1,2}.[0-9]{1,2}/;
    listCategory = data.split('\n');
    for (let category of listCategory) {
      if (!isSkill.test(category)) {
        const row = category.split('\t');
        if (row.length == 2) {
          categoryName.push(category);
        }
      }
    }
    return categoryName;
  }
}
