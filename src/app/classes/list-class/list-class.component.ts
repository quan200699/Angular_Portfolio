import {Component, OnInit} from '@angular/core';
import {ClassesService} from '../../service/classes.service';
import {Classes} from '../../model/classes';

@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.component.html',
  styleUrls: ['./list-class.component.css']
})
export class ListClassComponent implements OnInit {
  listClass: Classes[];

  constructor(private classesService: ClassesService) {
  }

  ngOnInit() {
    this.getAllClasses();
  }

  getAllClasses() {
    this.classesService.getAllClasses().subscribe(listClass => {
      this.listClass = listClass;
    });
  }
}
