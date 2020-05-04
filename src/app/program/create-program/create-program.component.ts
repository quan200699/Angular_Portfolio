import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProgramService} from '../../service/program/program.service';
import {Program} from '../../model/program';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.css']
})
export class CreateProgramComponent implements OnInit {
  programForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private programService: ProgramService) {
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#program-form').validate({
        rules: {
          name: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Hãy nhập tên chương trình học'
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

  createProgram() {
    const program: Program = {
      id: this.programForm.value.id,
      name: this.programForm.value.name,
      description: this.programForm.value.description
    };
    if (program.name !== "") {
      this.programService.createNewProgram(program).subscribe(() => {
        $(function() {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: 'success',
            title: 'Tạo mới thành công'
          });
        });
        this.programForm.reset();
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
            title: 'Tạo mới thất bại'
          });
        });
      });
    }
  }
}
