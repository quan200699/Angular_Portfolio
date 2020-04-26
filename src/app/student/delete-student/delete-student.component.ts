import {Component, OnInit} from '@angular/core';
import {Student} from '../../model/student';
import {Subscription} from 'rxjs';
import {StudentService} from '../../service/student.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {
  student: Student;
  sub: Subscription;

  constructor(private studentService: StudentService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getStudent(id);
    });
  }

  ngOnInit() {
  }

  getStudent(id: number) {
    this.studentService.getStudent(id).subscribe(student => {
      this.student = student;
    });
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe();
  }
}
