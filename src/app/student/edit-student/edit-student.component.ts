import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {StudentService} from '../../service/student.service';
import {Student} from '../../model/student';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {Classes} from '../../model/classes';
import {ClassesService} from '../../service/classes.service';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({
    studentId: new FormControl(''),
    name: new FormControl(''),
    classes: new FormControl()
  });
  student: Student;
  studentClass: Classes;
  listClass: Classes[];
  sub: Subscription;

  constructor(private studentService: StudentService,
              private activatedRoute: ActivatedRoute,
              private classesService: ClassesService) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getStudent(id);
    });
    this.getAllClasses();
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#student-form').validate({
        rules: {
          studentId: {
            required: true
          },
          name: {
            required: true
          },
          classes: {
            required: true
          }
        },
        messages: {
          studentId: {
            required: 'Hãy nhập mã học viên'
          },
          name: {
            required: 'Hãy nhập tên học viên'
          },
          classes: {
            required: 'Hãy chọn lớp học'
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

  getStudent(id: number) {
    this.studentService.getStudent(id).subscribe(student => {
      this.student = student;
      this.studentClass = student.classes;
    });
  }

  updateStudentInfo(id: number) {
    const student: Student = {
      id: this.studentForm.value.id,
      studentId: this.studentForm.value.studentId === '' ? this.student.studentId : this.studentForm.value.studentId,
      name: this.studentForm.value.name === '' ? this.student.name : this.studentForm.value.name,
      classes: {
        id: this.studentForm.value.classes === null ? this.studentClass.id : this.studentForm.value.classes
      }
    };
    this.studentService.updateStudent(id, student).subscribe(() => {
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

  getAllClasses() {
    this.classesService.getAllClasses().subscribe(listClass => {
      this.listClass = listClass;
    });
  }
}
