import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CoachService} from '../../service/coach.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {Coach} from '../../model/coach';

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
      coachId: this.coachForm.value.coachId,
      name: this.coachForm.value.name,
      email: this.coachForm.value.email,
      phoneNumber: this.coachForm.value.phone,
      address: this.coachForm.value.address,
      notice: this.coachForm.value.notice
    };
    this.coachService.updateCoachInfo(id, coach).subscribe(() => {
    }, () => {
      console.log('Xảy ra lỗi khi cập nhật thông tin');
    });
  }
}
