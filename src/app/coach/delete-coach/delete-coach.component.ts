import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CoachService} from '../../service/coach.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-delete-coach',
  templateUrl: './delete-coach.component.html',
  styleUrls: ['./delete-coach.component.css']
})
export class DeleteCoachComponent implements OnInit {
  id: number;
  coachId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  notice: string;
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

  deleteCoach(id: number) {
    this.coachService.deleteCoach(id).subscribe(() => {
    }, () => {
    });
  }
}
