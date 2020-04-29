import {Component, OnInit} from '@angular/core';
import {CoachService} from '../../service/coach/coach.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Coach} from '../../model/coach';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  id: number;
  coachId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  notice: string;
  password: string;
  changePasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl(),
    confirmPassword: new FormControl()
  });
  sub: Subscription;

  constructor(private coachService: CoachService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getCoachInfo(id);
    });
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#changePassword-form').validate({
        rules: {
          newPassword: {
            required: true
          },
          confirmPassword: {
            required: true
          }
        },
        messages: {
          newPassword: {
            required: 'Nhập mật khẩu mới'
          },
          confirmPassword: {
            required: 'Nhập lại mật khẩu',
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

  getCoachInfo(id: number) {
    this.coachService.getCoach(id).subscribe(coach => {
      this.id = coach.id;
      this.coachId = coach.coachId;
      this.name = coach.name;
      this.email = coach.email;
      this.phoneNumber = coach.phoneNumber;
      this.address = coach.address;
      this.notice = coach.notice;
      this.password = coach.password;
    });
  }

  changePassword(id: number) {
    const newPassword = this.changePasswordForm.value.newPassword;
    const confirmPassword = this.changePasswordForm.value.confirmPassword;
    const isCorrectConfirmPassword = newPassword === confirmPassword;
    if (isCorrectConfirmPassword) {
      const coach: Coach = {
        id: this.changePasswordForm.value.id,
        coachId: this.coachId,
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        address: this.address,
        notice: this.notice,
        password: newPassword === '' ? this.password : newPassword
      };
      if (newPassword !== null) {
        this.coachService.changePassword(id, coach).subscribe(() => {
          $(function() {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: 'success',
              title: 'Cập nhật mật khẩu thành công'
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
              title: 'Cập nhật mật khẩu thất bại'
            });
          });
        });
      }
    } else {
      alert('Nhập lại mật khẩu không đúng');
    }
  }
}
