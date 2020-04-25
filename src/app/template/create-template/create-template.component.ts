import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TemplateService} from '../../service/template.service';
import {Template} from '../../model/template';
import {Program} from '../../model/program';
import {ProgramService} from '../../service/program.service';

declare var $: any;

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  templateForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    programs: new FormControl()
  });
  listProgram: Program[];

  constructor(private templateService: TemplateService,
              private programService: ProgramService) {
    this.getAllProgram();
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#template-form').validate({
        rules: {
          name: {
            required: true
          },
          programs: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Hãy nhập tên bản đánh giá'
          },
          programs: {
            required: 'Chọn chương trình học'
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

  createTemplate() {
    const template: Template = {
      id: this.templateForm.value.id,
      name: this.templateForm.value.name,
      programs: {
        id: this.templateForm.value.programs
      }
    };
    if (template.name !== '') {
      this.templateService.createNewTemplate(template).subscribe(() => {
        this.templateForm.reset();
      });
    }
  }

  getAllProgram() {
    this.programService.getAllProgram().subscribe(listProgram => {
      this.listProgram = listProgram;
    });
  }
}
