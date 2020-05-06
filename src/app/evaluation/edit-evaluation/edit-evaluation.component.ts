import {Component, OnInit} from '@angular/core';
import {EvaluationService} from '../../service/evaluation/evaluation.service';
import {TemplateService} from '../../service/template/template.service';
import {ClassesService} from '../../service/classes/classes.service';
import {StudentService} from '../../service/student/student.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Template} from '../../model/template';
import {Classes} from '../../model/classes';
import {Student} from '../../model/student';
import {FormControl, FormGroup} from '@angular/forms';
import {Evaluations} from '../../model/evaluations';
import {Subscription} from 'rxjs';
import {UserToken} from '../../model/user-token';
import {Coach} from '../../model/coach';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-edit-evaluation',
  templateUrl: './edit-evaluation.component.html',
  styleUrls: ['./edit-evaluation.component.css']
})
export class EditEvaluationComponent implements OnInit {
  listTemplate: Template[];
  listClasses: Classes[];
  listEvaluation: string[];
  listStudent: Student[];
  id: number;
  name: string;
  description: string;
  currentEvaluation: string;
  student: Student;
  classes: Classes;
  coach: Coach;
  evaluationTemplates: Template;
  evaluationForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    evaluation: new FormControl(''),
    templates: new FormControl(),
  });
  currentUser: UserToken;
  sub: Subscription;

  constructor(private templateService: TemplateService,
              private evaluationService: EvaluationService,
              private classesService: ClassesService,
              private studentService: StudentService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getEvaluation(id);
    });
    this.getAllTemplate();
    this.getAllClasses();
    this.getAllStudent();
    this.listEvaluation = ['Xuất sắc', 'Tốt', 'Đạt', 'Chưa đạt'];
  }

  private getEvaluation(id: number) {
    this.evaluationService.getEvaluation(id).subscribe(evaluation => {
      this.id = evaluation.id;
      this.name = evaluation.name;
      this.description = evaluation.description;
      this.currentEvaluation = evaluation.evaluation;
      this.student = evaluation.student;
      this.evaluationTemplates = evaluation.templates;
      this.classes = evaluation.classes;
      this.coach = evaluation.coach;
    });
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#evaluation-form').validate({
        rules: {
          name: {
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

  editEvaluation(id: number) {
    const evaluations: Evaluations = {
      id: this.evaluationForm.value.id,
      name: this.evaluationForm.value.name === '' ? this.name : this.evaluationForm.value.name,
      description: this.evaluationForm.value.description === '' ? this.description : this.evaluationForm.value.description,
      evaluation: this.evaluationForm.value.evaluation === '' ? this.currentEvaluation : this.evaluationForm.value.evaluation,
      templates: {
        id: this.evaluationForm.value.templates === null ? this.evaluationTemplates.id : this.evaluationForm.value.templates
      },
    };
    this.evaluationService.updateEvaluationInfo(id, evaluations).subscribe(() => {
      $(function() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'success',
          title: 'Cập nhật thành công'
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
          title: 'Cập nhật thất bại'
        });
      });
    });
  }

  getAllTemplate() {
    this.templateService.getAllTemplate().subscribe(listTemplate => {
      this.listTemplate = listTemplate;
    });
  }

  getAllClasses() {
    this.classesService.getAllClasses().subscribe(listClasses => {
      this.listClasses = listClasses;
    });
  }

  getAllStudent() {
    this.studentService.getAllStudents().subscribe(listStudent => {
      this.listStudent = listStudent;
    });
  }
}
