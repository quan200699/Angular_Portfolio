import {Component, OnInit} from '@angular/core';
import {EvaluationDetail} from '../../model/evaluation-detail';
import {EvaluationDetailService} from '../../service/evaluation-detail/evaluation-detail.service';

declare var $: any;

@Component({
  selector: 'app-list-evaluation-detail',
  templateUrl: './list-evaluation-detail.component.html',
  styleUrls: ['./list-evaluation-detail.component.css']
})
export class ListEvaluationDetailComponent implements OnInit {
  evaluationDetailList: EvaluationDetail[];

  constructor(private evaluationDetailService: EvaluationDetailService) {
  }

  ngOnInit() {
    this.getAllEvaluationDetail();
  }

  getAllEvaluationDetail() {
    return this.evaluationDetailService.getAllEvaluationDetail().subscribe(evaluationDetailList => {
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
