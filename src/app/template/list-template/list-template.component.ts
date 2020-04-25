import {Component, OnInit} from '@angular/core';
import {Template} from '../../model/template';
import {TemplateService} from '../../service/template.service';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.css']
})
export class ListTemplateComponent implements OnInit {
  listTemplate: Template[];

  constructor(private templateService: TemplateService) {
    this.getAllTemplate();
  }

  ngOnInit() {
  }

  getAllTemplate() {
    this.templateService.getAllTemplate().subscribe(listTemplate => {
      this.listTemplate = listTemplate;
    });
  }
}
