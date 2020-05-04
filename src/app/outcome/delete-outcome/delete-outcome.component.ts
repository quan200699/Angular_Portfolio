import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OutcomeService} from '../../service/outcome/outcome.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-delete-outcome',
  templateUrl: './delete-outcome.component.html',
  styleUrls: ['./delete-outcome.component.css']
})
export class DeleteOutcomeComponent implements OnInit {
  id: number;
  title: string;
  sub: Subscription;

  constructor(private outcomeService: OutcomeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getOutcome(id);
    });
  }

  ngOnInit() {
  }

  getOutcome(id: number) {
    this.outcomeService.getOutcome(id).subscribe(outcome => {
      this.id = outcome.id;
      this.title = outcome.title;
    });
  }

  deleteOutcome(id: number) {
    this.outcomeService.deleteOutcome(id).subscribe(() => {
      this.router.navigate(['/admin/outcome-management']);
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
