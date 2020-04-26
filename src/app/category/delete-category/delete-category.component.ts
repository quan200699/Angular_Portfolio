import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {Subscription} from 'rxjs';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  category: Category;
  sub: Subscription;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getCategory(id);
    });
  }

  ngOnInit() {
  }

  getCategory(id: number) {
    this.categoryService.getCategory(id).subscribe(category => {
      this.category = category;
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe();
  }
}
