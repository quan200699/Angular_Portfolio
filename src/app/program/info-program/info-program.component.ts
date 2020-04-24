import {Component, OnInit} from '@angular/core';
import {Classes} from '../../model/classes';
import {Subscription} from 'rxjs';
import {ProgramService} from '../../service/program.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-info-program',
  templateUrl: './info-program.component.html',
  styleUrls: ['./info-program.component.css']
})
export class InfoProgramComponent implements OnInit {
  listClass: Classes[];
  sub: Subscription;
  programName: string;

  constructor(private programService: ProgramService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getAllClassByProgram(id);
    });
  }

  ngOnInit() {
  }

  getProgram(id: number) {
    this.programService.getProgram(id).subscribe(program => {
      this.programName = program.name;
    });
  }

  getAllClassByProgram(id: number) {
    this.programService.getAllClassByProgram(id).subscribe(listClass => {
      this.listClass = listClass;
    });
  }

}
