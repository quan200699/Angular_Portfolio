import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Template} from '../../model/template';
import {TemplateService} from '../../service/template.service';
import {OutcomeService} from '../../service/outcome.service';
import {Outcome} from '../../model/outcome';

declare var $: any;

@Component({
  selector: 'app-create-outcome',
  templateUrl: './create-outcome.component.html',
  styleUrls: ['./create-outcome.component.css']
})
export class CreateOutcomeComponent implements OnInit {
  outcomeForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    templates: new FormControl()
  });
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

  createOutcome(outcomeTitle: string) {
    const outcome: Outcome = {
      id: this.outcomeForm.value.id,
      title: outcomeTitle,
      templates: {
        id: this.outcomeForm.value.templates
      }
    };
    if (outcome.title != '') {
      this.outcomeService.createNewOutcome(outcome).subscribe(() => {
        this.outcomeForm.reset();
      });
    }
  }

  createManyOutcome() {
    let data = this.copyFromWordForm.value.data;
    let listOutcome;
    listOutcome = data.split('\n');
    for (let outcome of listOutcome) {
      if (outcome.includes('PHẦN ')) {
        this.createOutcome(outcome);
      }
    }
  }
}
