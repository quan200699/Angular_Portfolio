import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../service/student.service';
import {Student} from '../../model/student';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  studentList: Student[];

  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
    this.getStudentList();
  }

  private getStudentList() {
    this.studentService.getAllStudents().subscribe(students => {
      this.studentList = students;
    });
  }
}
