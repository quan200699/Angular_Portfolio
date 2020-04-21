import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassesService} from '../../service/classes.service';
import {Classes} from '../../model/classes';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {
  classForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private classesService: ClassesService) {
  }

  ngOnInit() {
  }

  createClass() {
    const classes: Classes = {
      id: this.classForm.value.id,
      name: this.classForm.value.name
    };
    this.classesService.createNewClasses(classes).subscribe(() => {
    }, () => {
      console.log('Lỗi tạo mới lớp học');
    });
  }
}
