import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProgramService} from '../../service/program.service';
import {Program} from '../../model/program';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.css']
})
export class EditProgramComponent implements OnInit {
  sub: Subscription;
  name: string;
  description: string;
  id: number;
  programForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });


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

  updateProgram(id: number) {
    const program: Program = {
      id: this.programForm.value.id,
      name: this.programForm.value.name === '' ? this.name : this.programForm.value.name,
      description: this.programForm.value.description === '' ? this.description : this.programForm.value.description
    };
    this.programService.updateProgram(id, program).subscribe(() => {
    }, () => {
    });
  }
}
