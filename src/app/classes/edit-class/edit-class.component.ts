import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassesService} from '../../service/classes.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {Classes} from '../../model/classes';
import {ProgramService} from '../../service/program.service';
import {Program} from '../../model/program';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  className: string;
  classId: number;
  programId: number;
  classForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    program: new FormControl('')
  });
  sub: Subscription;
  programList: Program[];

  constructor(private classesService: ClassesService,
              private activatedRoute: ActivatedRoute,
              private programService: ProgramService) {
    this.getAllProgram();
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getCurrentClass(id);
    });
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#class-form').validate({
        rules: {
          name: {
            required: true
          },
          program: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Hãy nhập đầy đủ tên lớp'
          },
          program: {
            required: 'Chọn chương trình học '
          }
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
          error.addClass('invalid-feedback');
          element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
          $(element).addClass('is-invalid');
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).removeClass('is-invalid');
        }
      });
    });
  }

  getCurrentClass(id: number) {
    this.classesService.getClasses(id).subscribe(classes => {
      this.className = classes.name;
      this.classId = classes.id;
      this.programId = classes.programs.id;
    });
  }

  editClass(id: number) {
    const classes: Classes = {
      id: this.classForm.value.id,
      name: this.classForm.value.name === '' ? this.className : this.classForm.value.name,
      programs: {
        id: this.classForm.value.program === null ? this.programId : this.classForm.value.program
      }
    };
    this.classesService.updateClassesInfo(id, classes).subscribe(() => {
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

  getAllProgram() {
    this.programService.getAllProgram().subscribe(listProgram => {
      this.programList = listProgram;
    });
  }
}
