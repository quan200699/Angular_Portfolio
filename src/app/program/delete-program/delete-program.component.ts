import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProgramService} from '../../service/program.service';

@Component({
  selector: 'app-delete-program',
  templateUrl: './delete-program.component.html',
  styleUrls: ['./delete-program.component.css']
})
export class DeleteProgramComponent implements OnInit {
  sub: Subscription;
  name: string;
  description: string;
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private programService: ProgramService) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getProgramInfo(id);
    });
  }

  ngOnInit() {
  }

  getProgramInfo(id: number) {
    this.programService.getProgram(id).subscribe(program => {
      this.name = program.name;
      this.id = program.id;
      this.description = program.description;
    });
  }

  deleteProgram(id: number) {
    this.programService.deleteProgram(id).subscribe();
  }
}
