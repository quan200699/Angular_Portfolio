import {Component, OnInit} from '@angular/core';
import {EvaluationService} from '../../service/evaluation/evaluation.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {EvaluationDetail} from '../../model/evaluation-detail';

declare var $: any;

@Component({
  selector: 'app-info-evaluation',
  templateUrl: './info-evaluation.component.html',
  styleUrls: ['./info-evaluation.component.css']
})
export class InfoEvaluationComponent implements OnInit {
  sub: Subscription;
  name: string;
  evaluationDetailList: EvaluationDetail[];

  constructor(private evaluationService: EvaluationService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = +paramMap.get('id');
      this.getEvaluation(id);
      this.getAllEvaluationDetail(id);
    });
  }

  ngOnInit() {
  }

  getEvaluation(id: number) {
    this.evaluationService.getEvaluation(id).subscribe(evaluation => {
      this.name = evaluation.name;
    });
  }

  getAllEvaluationDetail(id: number) {
    return this.evaluationService.getAllEvaluationDetailByEvaluation(id).subscribe(evaluationDetailList => {
      this.evaluationDetailList = evaluationDetailList;
      $(function() {
        $('#table-evaluation-detail').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false,
        });
      });
    });
  }
}
