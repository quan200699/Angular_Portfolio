import {Component, OnInit} from '@angular/core';
import {Program} from '../../model/program';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {TemplateService} from '../../service/template/template.service';
import {ProgramService} from '../../service/program/program.service';
import {Template} from '../../model/template';
import {ActivatedRoute, ParamMap} from '@angular/router';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.css']
})
export class EditTemplateComponent implements OnInit {
  templateName: string;
  templateProgram: Program;
  id: number;
  listProgram: Program[];
  sub: Subscription;
  templateForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    programs: new FormControl()
  });

  constructor(private templateService: TemplateService,
              private programService: ProgramService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getTemplate(id);
    });
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

  getAllProgram() {
    this.programService.getAllProgram().subscribe(listProgram => {
      this.listProgram = listProgram;
    });
  }

  getTemplate(id: number) {
    this.templateService.getTemplate(id).subscribe(template => {
      this.templateName = template.name;
      this.templateProgram = template.programs;
      this.id = template.id;
    });
  }

  editTemplate(id: number) {
    const template: Template = {
      id: this.templateForm.value.id,
      name: this.templateForm.value.name === '' ? this.templateName : this.templateForm.value.name,
      programs: {
        id: this.templateForm.value.programs === '' ? this.templateProgram.id : this.templateForm.value.id
      }
    };
    this.templateService.updateTemplate(id, template).subscribe(() => {
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
