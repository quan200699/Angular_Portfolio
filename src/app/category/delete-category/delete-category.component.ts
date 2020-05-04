import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {Subscription} from 'rxjs';
import {CategoryService} from '../../service/category/category.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  category: Category;
  sub: Subscription;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
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
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.router.navigate(['/admin/category-management']);
      $(function() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'success',
          title: 'Xóa thành công'
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
          title: 'Xóa thất bại'
        });
      });
    });
  }
}
