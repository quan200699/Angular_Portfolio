import {Component, OnInit} from '@angular/core';
import {TemplateService} from '../../service/template/template.service';
import {Evaluations} from '../../model/evaluations';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-info-template',
  templateUrl: './info-template.component.html',
  styleUrls: ['./info-template.component.css']
})
export class InfoTemplateComponent implements OnInit {
  evaluationList: Evaluations[];
  sub: Subscription;

  constructor(private templateService: TemplateService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getAllEvaluation(id);
    });
  }

  ngOnInit() {
  }

  getAllEvaluation(id: number) {
    return this.templateService.getAllEvaluationsByTemplate(id).subscribe(evaluationList => {
      this.evaluationList = evaluationList;
      $(function() {
        $('#table-evaluation').DataTable({
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
