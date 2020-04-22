import {Component, OnInit} from '@angular/core';
import {Student} from '../../model/student';
import {Subscription} from 'rxjs';
import {ClassesService} from '../../service/classes.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-info-class',
  templateUrl: './info-class.component.html',
  styleUrls: ['./info-class.component.css']
})
export class InfoClassComponent implements OnInit {
  studentList: Student[];
  sub: Subscription;
  className: string;

  constructor(private classesService: ClassesService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getClassInfo(id);
      this.getAllStudentByClass(id);
    });
  }

  ngOnInit() {
  }

  getClassInfo(id: number) {
    this.classesService.getClasses(id).subscribe(classes => {
      this.className = classes.name;
    });
  }

  getAllStudentByClass(id: number) {
    this.classesService.getAllStudentByClass(id).subscribe(studentList => {
      this.studentList = studentList;
    });
  }
}
