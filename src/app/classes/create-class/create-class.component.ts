import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassesService} from '../../service/classes.service';
import {Classes} from '../../model/classes';
import {ProgramService} from '../../service/program.service';
import {Program} from '../../model/program';

declare var $: any;

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {
  classForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    program: new FormControl()
  });
  copyClassDataFromAndyForm: FormGroup = new FormGroup({
    data: new FormControl('')
  });
  programList: Program[];

  constructor(private classesService: ClassesService,
              private programService: ProgramService) {
    this.getAllProgram();
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

  createClass(classList: string[]) {
    const classes: Classes = {
      id: this.classForm.value.id,
      name: classList[1]
    };
    if (classes.name != '') {
      this.classesService.createNewClasses(classes).subscribe(() => {
        this.classForm.reset();
      }, () => {
      });
    }
  }

  getAllProgram() {
    this.programService.getAllProgram().subscribe(listProgram => {
      this.programList = listProgram;
    });
  }

  createManyClasses() {
    let data = this.copyClassDataFromAndyForm.value.data;
    let listClass;
    let classesRows = [];
    listClass = data.split('\n');
    for (let classes of listClass) {
      let row = classes.split('\t');
      if (row.length >= 3) {
        classesRows = row;
        this.createClass(classesRows);
      }
    }
  }
}
