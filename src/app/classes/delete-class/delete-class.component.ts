import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ClassesService} from '../../service/classes.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-delete-class',
  templateUrl: './delete-class.component.html',
  styleUrls: ['./delete-class.component.css']
})
export class DeleteClassComponent implements OnInit {
  className: string;
  classId: number;
  sub: Subscription;

  constructor(private classesService: ClassesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getCurrentClass(id);
    });
  }

  ngOnInit() {
  }

  getCurrentClass(id: number) {
    this.classesService.getClasses(id).subscribe(classes => {
      this.className = classes.name;
      this.classId = classes.id;
    });
  }

  deleteClass(id: number) {
    this.classesService.deleteClasses(id).subscribe(() => {
      this.router.navigate(['/admin/classes-management']);
    }, () => {
    });
  }
}
