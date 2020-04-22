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

  constructor(private studentService: StudentService) {
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
          }
        },
        messages: {
          studentId: {
            required: 'Hãy nhập mã học viên'
          },
          name: {
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

  createStudent() {
    const student: Student = {
      id: this.studentForm.value.id,
      studentId: this.studentForm.value.studentId,
      name: this.studentForm.value.name
    };
    this.studentService.createStudent(student).subscribe(() => {
      this.studentForm.reset();
    }, () => {
    });
  }
}
