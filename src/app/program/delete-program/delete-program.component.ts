import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProgramService} from '../../service/program.service';

declare var $: any;
declare var Swal: any;

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
              private programService: ProgramService,
              private router: Router) {
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
    this.programService.deleteProgram(id).subscribe(() => {
      this.router.navigate(['/admin/program-management']);
      $(function() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'success',
          title: 'Xóa thành công'
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
          title: 'Xóa thất bại'
        });
      });
    });
  }
}
