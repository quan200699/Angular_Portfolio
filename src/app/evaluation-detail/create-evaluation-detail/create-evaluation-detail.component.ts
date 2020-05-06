import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Evaluations} from '../../model/evaluations';
import {Skill} from '../../model/skill';
import {EvaluationDetailService} from '../../service/evaluation-detail/evaluation-detail.service';
import {EvaluationService} from '../../service/evaluation/evaluation.service';
import {SkillService} from '../../service/skill/skill.service';
import {EvaluationDetail} from '../../model/evaluation-detail';

declare var $: any;
declare var Swal: any;
let evaluationsId: number;
let evaluation: string;
let skillId: number;

@Component({
  selector: 'app-create-evaluation-detail',
  templateUrl: './create-evaluation-detail.component.html',
  styleUrls: ['./create-evaluation-detail.component.css']
})
export class CreateEvaluationDetailComponent implements OnInit {
  evaluationDetailForm: FormGroup = new FormGroup({
    evaluations: new FormControl(),
    skills: new FormControl(),
    evaluation: new FormControl('')
  });
  listEvaluations: Evaluations[];
  listSkill: Skill[];
  listEvaluation: string[];

  constructor(private evaluationDetailService: EvaluationDetailService,
              private evaluationService: EvaluationService,
              private skillService: SkillService) {
    this.getAllEvaluation();
    this.getAllSkill();
    this.listEvaluation = ['Xuất sắc', 'Tốt', 'Đạt', 'Chưa đạt', 'N/A'];
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.select2').select2();
      $('#evaluations').on('select2:select', function(e, source) {
        evaluationsId = $(e.currentTarget).val();
      });
      $('#evaluation').on('select2:select', function(e, source) {
        evaluation = $(e.currentTarget).val();
      });
      $('#skills').on('select2:select', function(e, source) {
        skillId = $(e.currentTarget).val();
      });
    });
  }

  getAllEvaluation() {
    this.evaluationService.getAllEvaluation().subscribe(listEvaluations => {
      this.listEvaluations = listEvaluations;
    });
  }

  getAllSkill() {
    this.skillService.getAllSkill().subscribe(listSkill => {
      this.listSkill = listSkill;
    });
  }

  createEvaluationDetail() {
    const evaluationDetail: EvaluationDetail = {
      evaluations: {
        id: evaluationsId
      },
      skills: {
        id: skillId
      },
      evaluation: evaluation
    };
    this.evaluationDetailService.createNewEvaluationDetail(evaluationDetail).subscribe(() => {
      $(function() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'success',
          title: 'Tạo mới thành công'
        });
      });
      this.evaluationDetailForm.reset();
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
          title: 'Tạo mới thất bại'
        });
      });
    });
  }
}
