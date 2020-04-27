import {Component, OnInit} from '@angular/core';
import {Coach} from '../../model/coach';
import {CoachService} from '../../service/coach.service';

declare var $: any;

@Component({
  selector: 'app-list-coach',
  templateUrl: './list-coach.component.html',
  styleUrls: ['./list-coach.component.css']
})
export class ListCoachComponent implements OnInit {
  coachList: Coach[];

  constructor(private coachService: CoachService) {
  }

  ngOnInit() {
    this.getAllCoach();
  }

  getAllCoach() {
    return this.coachService.getAllCoach().subscribe(listCoach => {
      this.coachList = listCoach;
      $(function () {
        $('#table-coach').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": true,
          "info": true,
          "autoWidth": false,
        });
      });
    });
  }
}
