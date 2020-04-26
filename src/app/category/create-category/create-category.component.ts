import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Outcome} from '../../model/outcome';
import {OutcomeService} from '../../service/outcome.service';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';

declare var $: any;

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  copyFromWordForm: FormGroup = new FormGroup({
    data: new FormControl('')
  });
  listOutcome: Outcome[];

  constructor(private outcomeService: OutcomeService,
              private categoryService: CategoryService) {
    this.getAllOutcome();
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#category-form').validate({
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

  getAllOutcome() {
    this.outcomeService.getAllOutcome().subscribe(listOutcome => {
      this.listOutcome = listOutcome;
    });
  }

  createCategory(categoryName: string[]) {
    const category: Category = {
      name: categoryName[1]
    };
    if (category.name != '') {
      this.categoryService.createNewCategory(category).subscribe(() => {
        this.copyFromWordForm.reset();
      });
    }
  }

  createManyCategory() {
    let data = this.copyFromWordForm.value.data;
    let listCategory;
    let categoryRow = [];
    let isCategory = /[1-9].[0-9]{1,2}[^.]/;
    let isSkill = /[1-9].[0-9]{1,2}.[0-9]{1,2}/;
    listCategory = data.split('\n');
    for (let category of listCategory) {
      if (category.search(isSkill) == -1) {
        const row = category.split(isCategory);
        if (row.length == 2) {
          categoryRow = row;
          this.createCategory(categoryRow);
        }
      }
    }
  }
}
