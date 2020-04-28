import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TemplateService} from '../../service/template.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-delete-template',
  templateUrl: './delete-template.component.html',
  styleUrls: ['./delete-template.component.css']
})
export class DeleteTemplateComponent implements OnInit {
  templateName: string;
  id: number;
  sub: Subscription;

  constructor(private templateService: TemplateService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getTemplate(id);
    });
  }

  ngOnInit() {
  }

  getTemplate(id: number) {
    this.templateService.getTemplate(id).subscribe(template => {
      this.templateName = template.name;
      this.id = template.id;
    });
  }

  deleteTemplate(id: number) {
    this.templateService.deleteTemplate(id).subscribe(() => {
      this.router.navigate(['/admin/template-management']);
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
