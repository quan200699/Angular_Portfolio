import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {EvaluationService} from '../../service/evaluation/evaluation.service';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-delete-evaluation',
  templateUrl: './delete-evaluation.component.html',
  styleUrls: ['./delete-evaluation.component.css']
})
export class DeleteEvaluationComponent implements OnInit {
  name: string;
  sub: Subscription;
  id: number;

  constructor(private evaluationService: EvaluationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = +paramMap.get('id');
      this.getEvaluation(id);
    });
  }

  ngOnInit() {
  }

  getEvaluation(id: number) {
    this.evaluationService.getEvaluation(id).subscribe(evaluation => {
      this.name = evaluation.name;
      this.id = evaluation.id;
    });
  }

  deleteEvaluation(id: number) {
    this.evaluationService.deleteEvaluation(id).subscribe(() => {
      this.router.navigate(['/evaluation']);
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
