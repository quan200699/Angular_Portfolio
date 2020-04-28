import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Template} from '../../model/template';
import {TemplateService} from '../../service/template.service';
import {OutcomeService} from '../../service/outcome.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {Outcome} from '../../model/outcome';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-edit-outcome',
  templateUrl: './edit-outcome.component.html',
  styleUrls: ['./edit-outcome.component.css']
})
export class EditOutcomeComponent implements OnInit {
  outcomeForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    templates: new FormControl()
  });
  listTemplate: Template[];
  id: number;
  title: string;
  outcomeTemplate: Template;
  sub: Subscription;

  constructor(private templateService: TemplateService,
              private outcomeService: OutcomeService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getOutcome(id);
    });
    this.getAllTemplate();
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#outcome-form').validate({
        rules: {
          title: {
            required: true
          },
          templates: {
            required: true
          }
        },
        messages: {
          title: {
            required: 'Hãy nhập tiêu đề'
          },
          templates: {
            required: 'Chọn bản mẫu'
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

  getAllTemplate() {
    this.templateService.getAllTemplate().subscribe(listTemplate => {
      this.listTemplate = listTemplate;
    });
  }

  getOutcome(id: number) {
    this.outcomeService.getOutcome(id).subscribe(outcome => {
      this.id = outcome.id
      this.title = outcome.title;
      this.outcomeTemplate = outcome.templates;
    });
  }

  editOutcome(id: number) {
    const outcome: Outcome = {
      id: this.outcomeForm.value.id,
      title: this.outcomeForm.value.title === '' ? this.title : this.outcomeForm.value.title,
      templates: {
        id: this.outcomeForm.value.templates == null ? this.outcomeTemplate.id : this.outcomeForm.value.templates
      }
    };
    this.outcomeService.editOutcome(id, outcome).subscribe(() => {
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
