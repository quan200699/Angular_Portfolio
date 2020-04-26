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
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    outcomes: new FormControl()
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
          name: {
            required: true
          },
          outcomes: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Hãy nhập tên danh mục'
          },
          outcomes: {
            required: 'Chọn outcome'
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

  createCategory() {
    const category: Category = {
      name: this.categoryForm.value.name,
      outComes: {
        id: this.categoryForm.value.outcomes
      }
    };
    if (category.name != '' && category.outComes != null) {
      this.categoryService.createNewCategory(category).subscribe(() => {
        this.categoryForm.reset();
      });
    }
  }
}
