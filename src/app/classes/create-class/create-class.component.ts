import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassesService} from '../../service/classes.service';
import {Classes} from '../../model/classes';
import {NotificationService} from '../../service/notification.service';

declare var $: any;
const FAIL = 'Có lỗi xảy ra trong quá trình thực hiện';
const SUCCESS = 'Thành công';
const NOTIFICATION = 'Thông báo';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {
  classForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private classesService: ClassesService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    $(document).ready(function() {
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

  createClass() {
    const classes: Classes = {
      id: this.classForm.value.id,
      name: this.classForm.value.name
    };
    this.classesService.createNewClasses(classes).subscribe(() => {
      this.classForm.reset();
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }
}
