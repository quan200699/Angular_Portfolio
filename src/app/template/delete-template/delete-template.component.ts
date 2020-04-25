import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TemplateService} from '../../service/template.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-delete-template',
  templateUrl: './delete-template.component.html',
  styleUrls: ['./delete-template.component.css']
})
export class DeleteTemplateComponent implements OnInit {
  templateName: string;
  id: number;
  sub: Subscription;

  constructor(private templateService: TemplateService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getTemplate(id);
    });
  }

  ngOnInit() {
  }

  getTemplate(id: number) {
    this.templateService.getTemplate(id).subscribe(template => {
      this.templateName = template.name;
      this.id = template.id;
    });
  }

  deleteTemplate(id: number) {
    this.templateService.deleteTemplate(id).subscribe();
  }
}
