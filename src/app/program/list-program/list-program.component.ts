import {Component, OnInit} from '@angular/core';
import {Program} from '../../model/program';
import {ProgramService} from '../../service/program.service';

@Component({
  selector: 'app-list-program',
  templateUrl: './list-program.component.html',
  styleUrls: ['./list-program.component.css']
})
export class ListProgramComponent implements OnInit {
  listProgram: Program[];

  constructor(private programService: ProgramService) {
  }

  ngOnInit() {
    this.getAllProgram();
  }

  getAllProgram() {
    this.programService.getAllProgram().subscribe(listProgram => {
      this.listProgram = listProgram;
    });
  }
}
