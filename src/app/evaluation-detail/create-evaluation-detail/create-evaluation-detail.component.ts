import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Evaluations} from '../../model/evaluations';
import {Skill} from '../../model/skill';
import {EvaluationDetailService} from '../../service/evaluation-detail/evaluation-detail.service';
import {EvaluationService} from '../../service/evaluation/evaluation.service';
import {SkillService} from '../../service/skill/skill.service';
import {EvaluationDetail} from '../../model/evaluation-detail';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';

declare var $: any;
declare var Swal: any;
let evaluationsId: number;
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
    evaluation: new FormControl()
  });
  listEvaluations: Evaluations[];
  listSkill: Skill[];
  listEvaluation: string[];
  listEvaluationDetail: EvaluationDetail[] = [{
    evaluations: null,
    skills: null,
    evaluation: ''
  }];
  evaluationChoice = null;
  evaluationCategoryChoice: string[] = [''];
  listCategory: Category[];

  constructor(private evaluationDetailService: EvaluationDetailService,
              private evaluationService: EvaluationService,
              private skillService: SkillService,
              private categoryService: CategoryService) {
    this.getAllEvaluation();
    this.getAllSkill();
    this.getAllCategory();
    this.listEvaluation = ['Xuất sắc', 'Tốt', 'Đạt', 'Chưa đạt', 'N/A'];
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.select2').select2();
      $('#evaluations').on('select2:select', function(e, source) {
        evaluationsId = $(e.currentTarget).val();
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

  createEvaluationDetail(evaluationDetail: EvaluationDetail) {
    if (evaluationDetail.evaluations != null) {
      this.evaluationDetailService.createNewEvaluationDetail(evaluationDetail).subscribe();
    }
  }

  createManyEvaluationDetail() {
    if (this.isFilledAllEvaluation()) {
      for (let evaluationDetail of this.listEvaluationDetail) {
        this.createEvaluationDetail(evaluationDetail);
      }
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
    } else {
      $(function() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'error',
          title: 'Chưa đánh giá hết các kỹ năng'
        });
      });
    }
  }

  addEvaluationDetailToList(index: number) {
    const evaluationDetail: EvaluationDetail = {
      evaluations: {
        id: evaluationsId
      },
      skills: {
        id: this.listSkill[index].id
      },
      evaluation: this.evaluationDetailForm.value.evaluation
    };
    this.listEvaluationDetail[index] = evaluationDetail;
  }

  isFilledAllEvaluation(): boolean {
    for (let i = 0; i < this.listSkill.length; i++) {
      if (this.listEvaluationDetail[i] == undefined) {
        return false;
      }
      if (this.listEvaluationDetail[i].evaluation == null) {
        return false;
      }
    }
    return true;
  }

  setAllEvaluation() {
    this.skillService.getAllSkill().subscribe(listSkill => {
      this.listSkill = listSkill;
      for (let i = 0; i < this.listSkill.length; i++) {
        const evaluationDetail: EvaluationDetail = {
          evaluations: {
            id: evaluationsId
          },
          skills: {
            id: this.listSkill[i].id
          },
          evaluation: this.evaluationChoice
        };
        this.listEvaluationDetail[i] = evaluationDetail;
      }
    });
  }

  setAllEvaluationByCategory(id: number, index: number) {
    this.categoryService.getAllSkillByCategory(id).subscribe(listSkill => {
      this.listSkill = listSkill;
      for (let j = 0; j < this.listSkill.length; j++) {
        const evaluationDetail: EvaluationDetail = {
          evaluations: {
            id: evaluationsId
          },
          skills: {
            id: this.listSkill[j].id
          },
          evaluation: this.evaluationCategoryChoice[index]
        };
        this.listEvaluationDetail[j] = evaluationDetail;
      }
    });
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(listCategory => {
      this.listCategory = listCategory;
      for (let category of listCategory) {
        this.addSkillToCategory(category);
      }
      this.createAllCategoryChoice();
    });
  }

  createAllCategoryChoice() {
    for (let i = 0; i < this.listCategory.length; i++) {
      this.evaluationCategoryChoice[i] = null;
    }
  }

  addSkillToCategory(category: Category) {
    this.categoryService.getAllSkillByCategory(category.id).subscribe(listSkill => {
      category.skills = listSkill;
    });
  }
}
