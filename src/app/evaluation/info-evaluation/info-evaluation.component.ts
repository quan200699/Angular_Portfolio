import {Component, OnInit} from '@angular/core';
import {EvaluationService} from '../../service/evaluation/evaluation.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {EvaluationDetail} from '../../model/evaluation-detail';
import {Skill} from '../../model/skill';
import {SkillService} from '../../service/skill/skill.service';

declare var $: any;

import * as pdfMakeConfig from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMakeConfig.vfs = pdfFonts.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';
import {OutcomeService} from '../../service/outcome/outcome.service';
import {CategoryService} from '../../service/category/category.service';
import {Evaluations} from '../../model/evaluations';

pdfMakeConfig.fonts = {
  MyriadPro: {
    normal: 'Myriad Pro Regular.ttf',
    bold: 'Myriad Pro Bold.ttf',
    italics: 'Myriad Pro Italic.ttf',
    bolditalics: 'Myriad Pro Bold Italic.ttf'
  }
};

@Component({
  selector: 'app-info-evaluation',
  templateUrl: './info-evaluation.component.html',
  styleUrls: ['./info-evaluation.component.css']
})
export class InfoEvaluationComponent implements OnInit {
  sub: Subscription;
  name: string;
  evaluationDetailList: EvaluationDetail[];
  skillList: Skill[];
  skillListLength = 0;
  evaluationDetailLength = 0;
  array: any[] = [];
  evaluation: Evaluations;
  id: number;

  constructor(private evaluationService: EvaluationService,
              private activatedRoute: ActivatedRoute,
              private skillService: SkillService,
              private outcomeService: OutcomeService,
              private categoryService: CategoryService,) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = +paramMap.get('id');
      this.getEvaluation(this.id);
      this.getAllOutcome();
      this.getAllEvaluationDetail(this.id);
      this.getAllSkill();
    });
  }

  ngOnInit() {
  }

  getEvaluation(id: number) {
    this.evaluationService.getEvaluation(id).subscribe(evaluation => {
      this.evaluation = evaluation;
      this.name = evaluation.name;
    });
  }

  getAllEvaluationDetail(id: number) {
    return this.evaluationService.getAllEvaluationDetailByEvaluation(id).subscribe(evaluationDetailList => {
      this.evaluationDetailList = evaluationDetailList;
      this.evaluationDetailLength = evaluationDetailList.length;
      $(function() {
        $('#table-evaluation-detail').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false,
        });
      });
    });
  }

  getAllSkill() {
    this.skillService.getAllSkill().subscribe(listSkill => {
      this.skillList = listSkill;
      this.skillListLength = listSkill.length;
    });
  }

  generatePdf(action) {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open':
        pdfMake.createPdf(documentDefinition).open();
        break;
      case 'print':
        pdfMake.createPdf(documentDefinition).print();
        break;
      case 'download':
        pdfMake.createPdf(documentDefinition).download();
        break;
      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  getDocumentDefinition() {
    const date = new Date(this.evaluation.createDate);
    return {
      pageMargins: [70, 120, 70, 60],
      header: function(currentPage, pageCount, pageSize) {
        return [
          {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAzMAAAAFCAIAAAD+AiXMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAySURBVGhD7dZBDQAwEAShqlmNJ7825kGCCN52AAAUmBkAQIWZAQBUmBkAQIWZAQA07D4p6j/xL/QSdQAAAABJRU5ErkJggg==',
            height: 5
          },
          {
            image: 'data:image/png;base64,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',
            width: 110,
            height: 90,
            margin: [20, 0, 0, 0],
          }
        ];
      },
      footer: {
        columns: [
          {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAAACCAIAAAAM8wO7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVDhPY9DQaBhFgw39//9/NGIGI/r//z8AUtfhW6CNZKoAAAAASUVORK5CYII=',
            width: 136,
            height: 2,
            margin: [0, 5, 0, 0],
          },
          {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIXSURBVChTRVJtT1JhGD5/S7P1IfGA5KzVCMycrflSP6FWVh/Shn0QQUU4vCgckPdaAuIwCDgoINRsAzcQRY8cOQc2/M6pi2Tr2dmecz/39dz3dV33Q4ii+Offqte5Nf26Qjl2d5AclJBK1bjBaOJ5/iYLWA/q8weAmHz23E478/kCPpudfjoxKSFl28FQD4otEPjS1z9gpx3NZqvT6dQ57vyCxTkvCCazpa//djAURkhwHId6tMMZiydQ27ppQ3pJo3V7vE6XO5vLUSYzKZW3Wi1iTW9AI1zKFwqNRqN0fFyrnZ+cVMuVymW9fnT0GynFYxVqEdDh8wW+bQfn3n3guKtXr98kk8xOZPft3HvuqhtG975vbNqmpmcJiIUIhtlHd3ShaWexWCr8/OVwukB9y+XJ5g6Z9L5kSNaFHuYL0eiexbrB88LKqh64dPoAxsGpdYMxkUwxTJqUDhNj4xNbLncksqtWLwI6v/Apk8nG4j/Ui58FQfg4v5BIpCjKPDP7kjBSZrgN7sVSCW5Uq6cse3l2VoO4C5YtlytI3X/wEOUImDdEDlMmy0Em6w98hVKzxbqk0Xl9fo/XBzKaZa18ZLTdbndHEAqF4bORMglCEyEuwwr8NHh+Wau7NXAHfBD2BhsO70hlcqXqiV5vSKWYZDKlW1l9pFDeGxmNxeIA/H8DWLAGs52eeQE+GA90gF+7fX2TFUXxL6//n7VzLF42AAAAAElFTkSuQmCC',
            width: 14,
            height: 14,
            margin: [20, 0, 0, 0],
          },
          {
            text: 'www.codegym.vn',
            margin: [25, 0, 0, 0],
          }
        ]
      },
      content: [
        {
          text: 'BOOTCAMP JAVA\n' +
            'ĐÁNH GIÁ NĂNG LỰC\n',
          bold: true,
          fontSize: 24,
          alignment: 'center',
          color: '#090e91',
          margin: [0, 0, 0, 5]
        },
        {
          text: '(Dành cho Huấn luyện viên)\n' +
            '\n' +
            'Huấn luyện viên sử dụng Rubric đánh giá năng lực dựa trên các hạng mục sau:\n',
          bold: true,
          italics: true,
          fontSize: 12,
          alignment: 'center',
          margin: [0, 0, 0, 5]
        },
        {
          text: '1.\tKết quả bài thi lý thuyết và thực hành cuối module của học viên\n' +
            '2.\tQuá trình học của học viên: bài tập, bài thực hành, quiz,…\n',
          italics: true,
          fontSize: 11,
          alignment: 'left',
          margin: [30, 0, 0, 30]
        },
        {
          columns: [
            [
              {
                text: 'Huấn luyện viên : ' + this.evaluation.coach.name,
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 5]
              },
              {
                text: 'Học viên : ' + this.evaluation.student.name,
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 5]
              },
              {
                text: 'Mã học viên : ' + this.evaluation.student.studentId,
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 5]
              },
              {
                text: 'Lớp : ' + this.evaluation.classes.name,
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 5]
              },
              {
                text: 'Chương trình học : BOOTCAMP JAVA',
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 5]
              },
              {
                text: 'Hình thức đào tạo : <Full-time 8x5, Part-time 4x5, Part-time 3x3>',
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 5]
              }]
          ]
        },
        {
          text: '\nI. ĐÁNH GIÁ CHUNG\n' +
            '1. Mức độ đánh giá (3) ' + this.evaluation.evaluation + '\n',
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 30]
        },
        {
          text: '\n2. Nhận xét chung\n',
          fontSize: 12,
          bold: true
        },
        {
          text: this.evaluation.description + '\n',
          fontSize: 12,
          margin: [0, 0, 0, 120]
        },
        {
          text: '\nHà Nội, ngày ' + date.getDay() + ' tháng ' + date.getMonth() + ' năm ' + date.getFullYear(),
          alignment: 'right',
          fontSize: 12,
        },
        {
          text: '\nHuấn luyện viên',
          alignment: 'right',
          fontSize: 12,
          margin: [0, 0, 40, 20],
        },
        {
          text: this.evaluation.coach.name,
          alignment: 'right',
          fontSize: 12,
          margin: [0, 0, 30, 20],
          pageBreak: 'after'
        },
        {
          text: 'II. CHI TIẾT\n' +
            '1/ ĐÁNH GIÁ CHI TIẾT \n',
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 20]
        },
        this.getEvaluationDetailObject(),
        {
          text: '2/  HOÀN THÀNH CÁC KHOÁ HỌC ONLINE',
          fontSize: 12,
          bold: true,
          margin: [0, 30, 0, 20]
        },
        {
          table: {
            widths: [40, '*', 80],
            heights: [30],
            body: [
              [
                {
                  text: 'STT',
                  style: 'tableHeader',
                  alignment: 'center',
                  fontSize: 11,
                  bold: true,
                },
                {
                  text: 'KHÓA HỌC',
                  style: 'tableHeader',
                  alignment: 'center',
                  fontSize: 11,
                  bold: true,
                },
                {
                  text: 'ĐÁNH GIÁ ',
                  style: 'tableHeader',
                  alignment: 'center',
                  fontSize: 11,
                  bold: true,
                },
              ],
              [
                {
                  text: '1',
                  alignment: 'center',
                  fontSize: 11,
                },
                {
                  text: 'Học cách học',
                  alignment: 'center',
                  fontSize: 11,
                },
                {
                  text: 'Đã hoàn thành',
                  alignment: 'center',
                  fontSize: 11,
                },
              ],
              [
                {
                  text: '2',
                  alignment: 'center',
                  fontSize: 11,
                },
                {
                  text: 'Hoàn thành mọi việc với Kanban',
                  alignment: 'center',
                  fontSize: 11,
                },
                {
                  text: 'Đã hoàn thành',
                  alignment: 'center',
                  fontSize: 11,
                },
              ],
              [
                {
                  text: '3',
                  alignment: 'center',
                  fontSize: 11,
                },
                {
                  text: 'Scrum Essence',
                  alignment: 'center',
                  fontSize: 11,
                },
                {
                  text: 'Đã hoàn thành',
                  alignment: 'center',
                  fontSize: 11,
                },
              ]
            ]
          }
        },
        {
          text: 'III. PHỤ LỤC',
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 20],
          pageBreak: 'before'
        },
        {
          text: 'Chú thích: \n' +
            '(1) Mức độ đánh giá chuẩn đầu ra\n' +
            '•\tChưa đạt: Học viên chưa có đủ khả năng để giải quyết các vấn đề liên quan đến năng lực đang được đánh giá.\n' +
            '•\tĐạt: Học viên có đủ khả năng để giải quyết các vấn đề đơn giản liên quan đến năng lực đang được đánh giá, tuy nhiên chưa đủ năng lực để giải quyết các vấn đề phức tạp hơn hoặc giải quyết các vấn đề một cách hiệu quả, nhanh chóng\n' +
            '•\tTốt: Học viên có đủ khả năng để giải quyết phần lớn các vấn đề liên quan đến năng lực đang được đánh giá với một mức độ hiệu quả và thời gian chấp nhận được.\n' +
            '•\tXuất sắc: Học viên có đủ khả năng để giải quyết hầu hết tất cả các vấn đề liên quan đến năng lực đang được đánh giá với mức độ hiệu quả cao trong một khoảng thời gian nhanh chóng.\n' +
            ' (2) Chuẩn đầu ra\n' +
            '•\tCác chuẩn đầu ra không đánh dấu sao là các chuẩn đầu ra mức cơ bản, bắt\n' +
            'buộc dành cho tất cả các học viên\n' +
            '•\tCác chuẩn đầu ra đánh dấu 1 sao (*) là dành cho các học viên có năng lực\n' +
            'khá, có thể dành thêm thời để luyện tập mở rộng\n' +
            '•\tCác chuẩn đầu ra đánh dấu 2 sao (**) là dành cho các học viên có năng lực rất khá, có thể dành thêm nhiều thời gian để luyện tập mở rộng\n' +
            '(3) Mức đánh giá năng lực khi kết thúc cả chương trình\n' +
            '•\tChưa đạt: Không đạt được 100% năng lực bắt buộc\n' +
            '•\tĐạt: 100% năng lực bắt buộc.\n' +
            '•\tTốt: 100% năng lực bắt buộc và >= 80% năng lực 1 sao (*)\n' +
            '•\tXuất sắc: 100% năng lực bắt buộc và 100% năng lực 1 sao và >= 80% năng\n' +
            '•\tlực 2 sao (**)\n',
          fontSize: 12,
          margin: [0, 0, 0, 20]
        },
      ],
      defaultStyle: {
        font: 'MyriadPro'
      }
    };
  }

  getEvaluationDetailObject() {
    return {
      table: {
        widths: [40, '*', 80],
        heights: [20],
        body: [
          [
            {
              text: 'CHUẨN ĐẦU RA',
              style: 'tableHeader',
              colSpan: 2,
              alignment: 'center',
              fontSize: 11,
              bold: true,
              fillColor: '#2e6ad1',
              color: 'white'
            },
            {},
            {
              text: 'ĐÁNH GIÁ',
              style: 'tableHeader',
              alignment: 'center',
              fontSize: 11,
              bold: true,
              fillColor: '#2e6ad1',
              color: 'white'
            }
          ],
          ...this.array.map(array => {
            if (array.title != undefined) {
              return [{
                text: array.title,
                style: 'tableHeader',
                colSpan: 3,
                alignment: 'left',
                bold: true,
                fontSize: 11,
              }, {}, {}];
            } else if (array.categoryId != undefined) {
              return [{
                text: array.categoryId,
                style: 'tableHeader',
                alignment: 'right',
                bold: true,
                fontSize: 11,
              },
                {
                  text: array.name,
                  style: 'tableHeader',
                  alignment: 'left',
                  colSpan: 2,
                  bold: true,
                  fontSize: 11,
                }, {}];
            }
            return [{
              text: array.skills.skillId,
              alignment: 'right',
              fontSize: 10,
            },
              {
                text: array.skills.name,
                alignment: 'left',
                fontSize: 10,
              },
              {
                text: array.evaluation,
                alignment: 'left',
                fontSize: 10,
              }];
          })
        ],
      }
    };

  }

  async getAllOutcome() {
    let outcomeList = await this.outcomeService.getAllOutcome().toPromise();
    this.sortOutcome(outcomeList);
    for (let i = 0; i < outcomeList.length; i++) {
      this.array.push(outcomeList[i]);
      let categoryList = await this.outcomeService.getAllCategoryByOutcome(outcomeList[i].id).toPromise();
      this.sortCategory(categoryList);
      for (let j = 0; j < categoryList.length; j++) {
        this.array.push(categoryList[j]);
        let skillList = await this.categoryService.getAllSkillByCategory(categoryList[j].id).toPromise();
        let evaluationDetailList = await this.evaluationService.getAllEvaluationDetailByEvaluation(this.id).toPromise();
        this.sortSkill(skillList);
        skillList.map(skill => {
          evaluationDetailList.map(evaluationDetail => {
            if (evaluationDetail.skills.skillId == skill.skillId) {
              this.array.push(evaluationDetail);
            }
          });
        });
      }
    }
  }

  sortOutcome(outcomeList) {
    for (let i = 0; i < outcomeList.length; i++) {
      for (let j = i + 1; j < outcomeList.length; j++) {
        let indexFirst = outcomeList[i].title.split('')[5];
        let indexSecond = outcomeList[j].title.split('')[5];
        if (Number(indexFirst) > Number(indexSecond)) {
          let temp = outcomeList[i];
          outcomeList[i] = outcomeList[j];
          outcomeList[j] = temp;
        }
      }
    }
  }

  sortCategory(categoryList) {
    for (let i = 0; i < categoryList.length; i++) {
      for (let j = i + 1; j < categoryList.length; j++) {
        let indexFirst = categoryList[i].categoryId.split('.')[1];
        let indexSecond = categoryList[j].categoryId.split('.')[1];
        if (Number(indexFirst) > Number(indexSecond)) {
          let temp = categoryList[i];
          categoryList[i] = categoryList[j];
          categoryList[j] = temp;
        }
      }
    }
  }

  sortSkill(skillList) {
    for (let i = 0; i < skillList.length; i++) {
      for (let j = i + 1; j < skillList.length; j++) {
        let indexFirst = skillList[i].skillId.split('.')[1];
        let indexSecond = skillList[j].skillId.split('.')[1];
        if (Number(indexFirst) > Number(indexSecond)) {
          let temp = skillList[i];
          skillList[i] = skillList[j];
          skillList[j] = temp;
        }
      }
    }
    for (let i = 0; i < skillList.length; i++) {
      for (let j = i + 1; j < skillList.length; j++) {
        let indexFirst = skillList[i].skillId.split('.')[2];
        let indexSecond = skillList[j].skillId.split('.')[2];
        if (Number(indexFirst) > Number(indexSecond)) {
          let temp = skillList[i];
          skillList[i] = skillList[j];
          skillList[j] = temp;
        }
      }
    }
  }
}
