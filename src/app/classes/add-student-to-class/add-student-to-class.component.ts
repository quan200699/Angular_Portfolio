import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {StudentService} from '../../service/student.service';
import {Student} from '../../model/student';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-add-student-to-class',
  templateUrl: './add-student-to-class.component.html',
  styleUrls: ['./add-student-to-class.component.css']
})
export class AddStudentToClassComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({
    studentId: new FormControl(''),
    name: new FormControl('')
  });
  copyStudentDataFromAndyForm: FormGroup = new FormGroup({
    data: new FormControl('')
  });
  sub: Subscription;
  id: number;

  constructor(private studentService: StudentService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#student-form').validate({
        rules: {
          data: {
            required: true
          }
        },
        messages: {
          data: {
            required: 'Hãy nhập họ tên học viên'
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

  createStudent(students: string[]) {
    const student: Student = {
      id: this.studentForm.value.id,
      studentId: students[1],
      name: students[2],
      classes: {
        id: this.id
      }
    };
    return this.studentService.createStudent(student).toPromise();
  }

  createManyStudent() {
    let data = this.copyStudentDataFromAndyForm.value.data;
    let students;
    let studentRows = [];
    students = data.split('\n');

    let createStudentsPromise = students.map(student => {
      let row = student.split('\t');
      if (row.length >= 3) {
        studentRows = row;
        return this.createStudent(studentRows);
      }
    });
    Promise.all(createStudentsPromise).then(() => {
      this.copyStudentDataFromAndyForm.reset();
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
    }).catch(() => {
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
