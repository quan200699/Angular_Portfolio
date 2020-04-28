import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ClassesService} from '../../service/classes.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-delete-class',
  templateUrl: './delete-class.component.html',
  styleUrls: ['./delete-class.component.css']
})
export class DeleteClassComponent implements OnInit {
  className: string;
  classId: number;
  sub: Subscription;

  constructor(private classesService: ClassesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getCurrentClass(id);
    });
  }

  ngOnInit() {
  }

  getCurrentClass(id: number) {
    this.classesService.getClasses(id).subscribe(classes => {
      this.className = classes.name;
      this.classId = classes.id;
    });
  }

  deleteClass(id: number) {
    this.classesService.deleteClasses(id).subscribe(() => {
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
      this.router.navigate(['/admin/classes-management']);
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
