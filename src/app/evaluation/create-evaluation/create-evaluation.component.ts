import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Template} from '../../model/template';
import {TemplateService} from '../../service/template/template.service';
import {EvaluationService} from '../../service/evaluation/evaluation.service';
import {Evaluations} from '../../model/evaluations';
import {Classes} from '../../model/classes';
import {ClassesService} from '../../service/classes/classes.service';
import {Student} from '../../model/student';
import {StudentService} from '../../service/student/student.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {UserToken} from '../../model/user-token';

declare var $: any;
declare var Swal: any;
let classId: number;
let studentId: number;

@Component({
  selector: 'app-create-evaluation',
  templateUrl: './create-evaluation.component.html',
  styleUrls: ['./create-evaluation.component.css']
})
export class CreateEvaluationComponent implements OnInit {
  listTemplate: Template[];
  listClasses: Classes[];
  listEvaluation: string[];
  listStudent: Student[];
  currentUser: UserToken;
  evaluationForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    evaluation: new FormControl(''),
    student: new FormControl(),
    templates: new FormControl(),
    classes: new FormControl(),
  });

  constructor(private templateService: TemplateService,
              private evaluationService: EvaluationService,
              private classesService: ClassesService,
              private studentService: StudentService,
              private authenticationService: AuthenticationService) {
    this.getAllTemplate();
    this.getAllClasses();
    this.getAllStudent();
    studentId = null;
    classId = null;
    this.listEvaluation = ['Xuất sắc', 'Tốt', 'Đạt', 'Chưa đạt'];
    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.select2').select2();
      $('#classes').on('select2:select', function(e, source) {
        classId = $(e.currentTarget).val();
      });
      $('#student').on('select2:select', function(e, source) {
        studentId = $(e.currentTarget).val();
      });
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
      name: this.evaluationForm.value.name,
      description: this.evaluationForm.value.description,
      evaluation: this.evaluationForm.value.evaluation,
      student: {
        id: studentId
      },
      templates: {
        id: this.evaluationForm.value.templates
      },
      classes: {
        id: classId
      },
      coach: {
        id: this.currentUser.id
      }
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
