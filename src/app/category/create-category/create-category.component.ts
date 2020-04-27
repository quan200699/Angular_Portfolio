import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import {OutcomeService} from '../../service/outcome.service';

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

  constructor(private categoryService: CategoryService,
              private outcomeService: OutcomeService) {
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

  createCategory(categoryRow: string) {
    let outcomeName = this.getOutcomeName();
    let isInOutcomeFirst = /1.[0-9]{1,2}/;
    let isInOutcomeSecond = /2.[0-9]{1,2}/;
    let isInOutcomeThird = /3.[0-9]{1,2}/;
    let isCategory = /[1-9].[0-9]{1,2}/;
    let row = categoryRow.split(isCategory);
    const category: Category = {
      name: row[1]
    };
    if (isInOutcomeFirst.test(categoryRow)) {
      this.outcomeService.findByTitle(outcomeName[0]).subscribe(outcome => {
        category.outComes = outcome;
        if (category.name != '') {
          this.categoryService.createNewCategory(category).subscribe(() => {
            this.copyFromWordForm.reset();
          });
        }
      });
    }
    if (isInOutcomeSecond.test(categoryRow)) {
      this.outcomeService.findByTitle(outcomeName[1]).subscribe(outcome => {
        category.outComes = outcome;
        if (category.name != '') {
          this.categoryService.createNewCategory(category).subscribe(() => {
            this.copyFromWordForm.reset();
          });
        }
      });
    }
    if (isInOutcomeThird.test(categoryRow)) {
      this.outcomeService.findByTitle(outcomeName[2]).subscribe(outcome => {
        category.outComes = outcome;
        if (category.name != '') {
          this.categoryService.createNewCategory(category).subscribe(() => {
            this.copyFromWordForm.reset();
          });
        }
      });
    }
  }

  createManyCategory() {
    let data = this.copyFromWordForm.value.data;
    let listCategory;
    // let categoryRow = [];
    let isCategory = /[1-9].[0-9]{1,2}/;
    let isSkill = /[1-9].[0-9]{1,2}.[0-9]{1,2}/;
    listCategory = data.split('\n');
    for (let category of listCategory) {
      if (!isSkill.test(category)) {
        // const row = category.split(isCategory);
        // if (row.length == 2) {
        //   categoryRow = row;
        if (isCategory.test(category)) {
          this.createCategory(category);
        }
        // }
      }
    }
  }

  getOutcomeName(): string[] {
    let data = this.copyFromWordForm.value.data;
    let listOutcome;
    let outcomeRow = [];
    let outcomeName = [];
    listOutcome = data.split('\n');
    for (let outcome of listOutcome) {
      const row = outcome.split('\t');
      if (outcome.includes('PHẦN ')) {
        outcomeRow = row;
        outcomeName.push(outcomeRow[0]);
      }
    }
    return outcomeName;
  }
}
