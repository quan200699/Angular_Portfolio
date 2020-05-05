import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Template} from '../../model/template';
import {TemplateService} from '../../service/template/template.service';
import {EvaluationService} from '../../service/evaluation/evaluation.service';
import {Evaluations} from '../../model/evaluations';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-create-evaluation',
  templateUrl: './create-evaluation.component.html',
  styleUrls: ['./create-evaluation.component.css']
})
export class CreateEvaluationComponent implements OnInit {
  evaluationForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    evaluation: new FormControl(''),
    student: new FormControl(),
    templates: new FormControl(),
    classes: new FormControl(),
  });
  listTemplate: Template[];
  listEvaluation: string[];

  constructor(private templateService: TemplateService,
              private evaluationService: EvaluationService) {
    this.getAllTemplate();
    this.listEvaluation = ['Xuất sắc', 'Tốt', 'Đạt', 'Chưa đạt'];
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#evaluation-form').validate({
        rules: {
          name: {
            required: true
          },
          student: {
            required: true
          },
          classes: {
            required: true
          },
          template: {
            required: true
          },
          evaluation: {
            required: true
          },
          description: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Nhập tên bản đánh giá'
          },
          student: {
            required: 'Nhập tên học viên'
          },
          classes: {
            required: 'Nhập tên lớp'
          },
          template: {
            required: 'Chọn bản mẫu'
          },
          evaluation: {
            required: 'Chọn mức đánh giá'
          },
          description: {
            required: 'Nhập gợi ý cho doanh nghiệp'
          }
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
          error.addClass('invalid-feedback');
          element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
          $(element).addClass('is-invalid');
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).removeClass('is-invalid');
        }
      });
    });
  }

  createEvaluation() {
    const evaluation: Evaluations = {
      id: this.evaluationForm.value.id,
      name: this.evaluationForm.value.name,
      description: this.evaluationForm.value.description,
      evaluation: this.evaluationForm.value.evaluation,
      student: this.evaluationForm.value.student,
      classes: this.evaluationForm.value.classes,
      templates: this.evaluationForm.value.template
    };
    if (evaluation.name !== '') {
      this.evaluationService.createNewEvaluation(evaluation).subscribe(() => {
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
        this.evaluationForm.reset();
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

  getAllTemplate() {
    this.templateService.getAllTemplate().subscribe(listTemplate => {
      this.listTemplate = listTemplate;
    });
  }
}
