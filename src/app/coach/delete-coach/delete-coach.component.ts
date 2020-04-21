import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CoachService} from '../../service/coach.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {NotificationService} from '../../service/notification.service';

const FAIL = 'Có lỗi xảy ra trong quá trình thực hiện';
const SUCCESS = 'Thành công';
const NOTIFICATION = 'Thông báo';

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
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
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
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }
}
