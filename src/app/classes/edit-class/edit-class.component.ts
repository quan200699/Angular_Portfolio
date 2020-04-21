import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassesService} from '../../service/classes.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {Classes} from '../../model/classes';

declare var $: any;

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  className: string;
  classId: number;
  classForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  sub: Subscription;

  constructor(private classesService: ClassesService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getCurrentClass(id);
    });
  }

  ngOnInit() {
    $(document).ready(function() {
      $.validator.setDefaults({
        submitHandler: function() {
          alert('Cập nhật thành công');
        }
      });
      $('#class-form').validate({
        rules: {
          name: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Hãy nhập đầy đủ tên lớp'
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

  getCurrentClass(id: number) {
    this.classesService.getClasses(id).subscribe(classes => {
      this.className = classes.name;
      this.classId = classes.id;
    });
  }

  editClass(id: number) {
    const classes: Classes = {
      id: this.classForm.value.id,
      name: this.classForm.value.name
    };
    this.classesService.updateClassesInfo(id, classes).subscribe(() => {
    }, () => {
    });
  }
}
