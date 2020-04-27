import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Skill} from '../../model/skill';
import {SkillService} from '../../service/skill.service';

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

  constructor(private skillService: SkillService) {
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

  createSkill(skillRow: string[]) {
    const skill: Skill = {
      name: skillRow[1].trim()
    };
    if (skill.name != '') {
      this.skillService.createNewSkill(skill).subscribe(() => {
        this.copyFromWordForm.reset();
      });
    }
  }

  createManySkill() {
    let data = this.copyFromWordForm.value.data;
    let listSkill;
    let skillRow = [];
    let isSkill = /[1-9].[0-9]{1,2}.[0-9]{1,2}/;
    listSkill = data.split('\n');
    for (let category of listSkill) {
      const row = category.split(isSkill);
      if (row.length == 2) {
        skillRow = row;
        this.createSkill(skillRow);
      }
    }
  }
}
