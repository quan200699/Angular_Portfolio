import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SkillService} from '../../service/skill/skill.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-delete-skill',
  templateUrl: './delete-skill.component.html',
  styleUrls: ['./delete-skill.component.css']
})
export class DeleteSkillComponent implements OnInit {
  id: number;
  name: string;
  sub: Subscription;

  constructor(private skillService: SkillService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getSkill(id);
    });
  }

  ngOnInit() {
  }

  getSkill(id: number) {
    this.skillService.getSkill(id).subscribe(skill => {
      this.name = skill.name;
      this.id = skill.id;
    });
  }

  deleteSkill(id: number) {
    this.router.navigate(['/admin/skill-management']);
    this.skillService.deleteSkill(id).subscribe(() => {
      $(function() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'success',
          title: 'Xóa thành công'
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
          title: 'Xóa thất bại'
        });
      });
    });
  }
}
