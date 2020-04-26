import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Outcome} from '../../model/outcome';
import {Category} from '../../model/category';
import {OutcomeService} from '../../service/outcome.service';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    outcomes: new FormControl()
  });
  listOutcome: Outcome[];
  category: Category;
  categoryOutcome: Outcome;
  sub: Subscription;

  constructor(private outcomeService: OutcomeService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getCategory(id);
    });
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

  getCategory(id: number) {
    this.categoryService.getCategory(id).subscribe(category => {
      this.category = category;
      this.categoryOutcome = category.outComes;
    });
  }

  updateCategoryInfo(id: number) {
    const category: Category = {
      name: this.categoryForm.value.name === '' ? this.category.name : this.categoryForm.value.name,
      outComes: {
        id: this.categoryForm.value.outcomes === null ? this.categoryOutcome.id : this.categoryForm.value.outcomes
      }
    };
    this.categoryService.editCategory(id, category).subscribe();
  }
}
