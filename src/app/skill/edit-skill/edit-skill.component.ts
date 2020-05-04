import {Component, OnInit} from '@angular/core';
import {Skill} from '../../model/skill';
import {Category} from '../../model/category';
import {Subscription} from 'rxjs';
import {SkillService} from '../../service/skill/skill.service';
import {CategoryService} from '../../service/category/category.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

declare var $: any;
declare var Swal: any;

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
  skillCategory: Category;
  sub: Subscription;
  listCategory: Category[];
  id: number;
  name: string;

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
    $(document).ready(function() {
      $('#skill-form').validate({
        rules: {
          name: {
            required: true
          },
          categories: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Hãy nhập tiêu đề'
          },
          categories: {
            required: 'Chọn bản mẫu'
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

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(listCategory => {
      this.listCategory = listCategory;
    });
  }

  getSkill(id: number) {
    this.skillService.getSkill(id).subscribe(skill => {
      this.name = skill.name;
      this.skillCategory = skill.categories;
      this.id = skill.id;
    });
  }

  updateSkillInfo(id: number) {
    const skill: Skill = {
      id: this.skillForm.value.id,
      name: this.skillForm.value.name === '' ? this.name : this.skillForm.value.name,
      categories: {
        id: this.skillForm.value.categories === null ? this.skillCategory.id : this.skillForm.value.categories
      }
    };
    this.skillService.editSkill(id, skill).subscribe(() => {
      $(function() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'success',
          title: 'Cập nhật thành công'
        });
      });
    }, () => {
      $(function() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'error',
          title: 'Cập nhật thất bại'
        });
      });
    });
  }
}
