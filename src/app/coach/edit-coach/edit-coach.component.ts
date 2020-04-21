import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CoachService} from '../../service/coach.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {Coach} from '../../model/coach';

declare var $: any;

@Component({
  selector: 'app-edit-coach',
  templateUrl: './edit-coach.component.html',
  styleUrls: ['./edit-coach.component.css']
})
export class EditCoachComponent implements OnInit {
  id: number;
  coachId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  notice: string;
  coachForm: FormGroup = new FormGroup({
    coachId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    notice: new FormControl(''),
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

  getCoachInfo(id: number) {
    this.coachService.getCoach(id).subscribe(coach => {
      this.id = coach.id;
      this.coachId = coach.coachId;
      this.name = coach.name;
      this.email = coach.email;
      this.phoneNumber = coach.phoneNumber;
      this.address = coach.address;
      this.notice = coach.notice;
    });
  }

  updateCoachInfo(id: number) {
    const coach: Coach = {
      id: this.coachForm.value.id,
      coachId: this.coachForm.value.coachId === "" ? this.coachId : this.coachForm.value.coachId,
      name: this.coachForm.value.name === "" ? this.name : this.coachForm.value.name,
      email: this.coachForm.value.email === "" ? this.email : this.coachForm.value.email,
      phoneNumber: this.coachForm.value.phoneNumber === "" ? this.phoneNumber : this.coachForm.value.phoneNumber,
      address: this.coachForm.value.address === "" ? this.address : this.coachForm.value.address,
      notice: this.coachForm.value.notice
    };
    this.coachService.updateCoachInfo(id, coach).subscribe(() => {
    }, () => {
    });
  }
}
