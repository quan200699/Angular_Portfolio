import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProgramService} from '../../service/program.service';
import {Program} from '../../model/program';

declare var $: any;

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
        this.programForm.reset();
      }, () => {
      });
    }
  }
}
