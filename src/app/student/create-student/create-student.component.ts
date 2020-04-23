import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {StudentService} from '../../service/student.service';
import {Student} from '../../model/student';

declare var $: any;

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({
    studentId: new FormControl(''),
    name: new FormControl('')
  });
  copyStudentDataFromAndyForm: FormGroup = new FormGroup({
    data: new FormControl('')
  });

  constructor(private studentService: StudentService) {
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
      name: students[2]
    };
    this.studentService.createStudent(student).subscribe(() => {
      this.studentForm.reset();
    }, () => {
    });
  }

  createManyStudent() {
    let data = this.copyStudentDataFromAndyForm.value.data;
    let students;
    let studentRows = [];
    students = data.split('\n');
    for (let student of students) {
      let row = student.split('\t');
      if (row.length >= 3) {
        studentRows = row;
        this.createStudent(studentRows);
      }
    }
  }
}
