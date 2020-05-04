import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Template} from '../../model/template';
import {TemplateService} from '../../service/template/template.service';
import {OutcomeService} from '../../service/outcome/outcome.service';
import {Outcome} from '../../model/outcome';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-create-outcome',
  templateUrl: './create-outcome.component.html',
  styleUrls: ['./create-outcome.component.css']
})
export class CreateOutcomeComponent implements OnInit {
  copyFromWordForm: FormGroup = new FormGroup({
    data: new FormControl('')
  });
  listTemplate: Template[];

  constructor(private templateService: TemplateService,
              private outcomeService: OutcomeService) {
    this.getAllTemplate();
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#outcome-form').validate({
        rules: {
          data: {
            required: true
          }
        },
        messages: {
          data: {
            required: 'Hãy nhập dữ liệu'
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

  createOutcome(outcomeTitle: string) {
    const outcome: Outcome = {
      title: outcomeTitle
    };
    if (outcome.title != '') {
      return this.outcomeService.createNewOutcome(outcome).toPromise();
    }
  }

  createManyOutcome() {
    let data = this.copyFromWordForm.value.data;
    let listOutcome;
    let outcomeRow = [];
    listOutcome = data.split('\n');
    let createOutcomesPromises = listOutcome.map(outcome => {
      const row = outcome.split('\t');
      if (outcome.includes('PHẦN ')) {
        outcomeRow = row;
        this.createOutcome(outcomeRow[0].trim());
      }
    });
    Promise.all(createOutcomesPromises).then(() => {
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
      this.copyFromWordForm.reset();
    }).catch(() => {
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
