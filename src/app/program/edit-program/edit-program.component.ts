import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProgramService} from '../../service/program.service';
import {Program} from '../../model/program';
import {FormControl, FormGroup} from '@angular/forms';

declare var $: any;
declare var Swal: any;

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
      $(function() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'success',
          title: 'Cập nhật thành công'
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
          title: 'Cập nhật thất bại'
        });
      });
    });
  }
}
