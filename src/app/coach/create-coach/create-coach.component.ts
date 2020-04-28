import {Component, OnInit} from '@angular/core';
import {CoachService} from '../../service/coach.service';
import {Coach} from '../../model/coach';
import {FormControl, FormGroup, Validators} from '@angular/forms';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-create-coach',
  templateUrl: './create-coach.component.html',
  styleUrls: ['./create-coach.component.css']
})
export class CreateCoachComponent implements OnInit {
  coach: Coach;
  coachForm: FormGroup = new FormGroup({
    coachId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    notice: new FormControl(''),
  });

  constructor(private coachService: CoachService) {
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#coach-form').validate({
        rules: {
          coachId: {
            required: true
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true,
          },
          phoneNumber: {
            required: true
          },
          address: {
            required: true
          }
        },
        messages: {
          coachId: {
            required: 'Nhập mã giảng viên'
          }, name: {
            required: 'Nhập tên giảng viên'
          },
          email: {
            required: 'Nhập địa chỉ email',
            email: 'Nhập đúng định dạng email'
          },
          phoneNumber: {
            required: 'Nhập số điện thoại'
          },
          address: {
            required: 'Nhập địa chỉ nhà'
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

  createCoach() {
    const coach: Coach = {
      id: this.coachForm.value.id,
      coachId: this.coachForm.value.coachId,
      name: this.coachForm.value.name,
      email: this.coachForm.value.email,
      phoneNumber: this.coachForm.value.phoneNumber,
      address: this.coachForm.value.address,
      notice: this.coachForm.value.notice
    };
    if (coach.name !== '') {
      this.coachService.createNewCoach(coach).subscribe(() => {
        $(function() {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: 'success',
            title: 'Tạo mới thành công'
          });
        });
        this.coachForm.reset();
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
            title: 'Tạo thất bại'
          });
        });
      });
    }
  }
}
