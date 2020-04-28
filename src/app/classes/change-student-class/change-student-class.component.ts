import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {StudentService} from '../../service/student.service';
import {Classes} from '../../model/classes';
import {Student} from '../../model/student';
import {ClassesService} from '../../service/classes.service';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-change-student-class',
  templateUrl: './change-student-class.component.html',
  styleUrls: ['./change-student-class.component.css']
})
export class ChangeStudentClassComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({
    studentId: new FormControl(''),
    name: new FormControl(''),
    classes: new FormControl()
  });
  sub: Subscription;
  studentName: string;
  idStudent: string;
  id: number;
  studentClass: Classes;
  studentClassId: number;
  listClass: Classes[];
  buttonChangeClicked: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: StudentService,
              private classesService: ClassesService) {
    this.buttonChangeClicked = false;
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('studentId');
      this.getStudentInfo(id);
    });
    this.getAllClasses();
  }

  ngOnInit() {
  }

  getStudentInfo(id: number) {
    this.studentService.getStudent(id).subscribe(student => {
      this.id = student.id;
      this.studentName = student.name;
      this.idStudent = student.studentId;
      this.studentClass = student.classes;
      this.studentClassId = student.classes.id;
    });
  }

  changeStudentClass(id: number) {
    const student: Student = {
      id: this.studentForm.value.id,
      name: this.studentName,
      studentId: this.idStudent,
      classes: {
        id: this.studentForm.value.classes == null ? this.studentClassId : this.studentForm.value.classes
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
          title: 'Cập nhật lớp cho học viên thành công'
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
          title: 'Cập nhật lớp cho học viên thất bại'
        });
      });
    });
  }

  getAllClasses() {
    this.classesService.getAllClasses().subscribe(listClass => {
      this.listClass = listClass;
    });
  }

  changeButtonStatus() {
    this.buttonChangeClicked = !this.buttonChangeClicked;
  }
}
