import {Component, OnInit} from '@angular/core';
import {Evaluations} from '../model/evaluations';
import {EvaluationService} from '../service/evaluation/evaluation.service';
import {EvaluationDetail} from '../model/evaluation-detail';
import {EvaluationDetailService} from '../service/evaluation-detail/evaluation-detail.service';
import {Outcome} from '../model/outcome';
import {OutcomeService} from '../service/outcome/outcome.service';

import * as pdfMakeConfig from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMakeConfig.vfs = pdfFonts.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';

pdfMakeConfig.fonts = {
  MyriadPro: {
    normal: 'Myriad Pro Regular.ttf',
    bold: 'Myriad Pro Bold.ttf',
    italics: 'Myriad Pro Italic.ttf',
    bolditalics: 'Myriad Pro Bold Italic.ttf'
  }
};

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent implements OnInit {
  evaluationList: Evaluations[];
  evaluation: Evaluations;
  evaluationDetailList: EvaluationDetail[];
  outcomeList: Outcome[];

  constructor(private evaluationService: EvaluationService,
              private evaluationDetailService: EvaluationDetailService,
              private outcomeService: OutcomeService) {
    this.getAllEvaluation();
    this.getAllOutcome();
    this.getAllEvaluationDetail();
  }

  ngOnInit() {
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
      pageMargins: [40, 120, 40, 60],
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
          margin: [0, 0, 0, 20],
          color: '#090e91'
        },
        {
          text: '(Dành cho Huấn luyện viên)\n' +
            '\n' +
            'Huấn luyện viên sử dụng Rubric đánh giá năng lực dựa trên các hạng mục sau:\n',
          bold: true,
          italics: true,
          fontSize: 12,
          alignment: 'center',
          margin: [0, 0, 0, 30]
        },
        {
          text: '1.\tKết quả bài thi lý thuyết và thực hành cuối module của học viên\n' +
            '2.\tQuá trình học của học viên: bài tập, bài thực hành, quiz,…\n',
          italics: true,
          fontSize: 11,
          alignment: 'left',
          margin: [50, 0, 0, 30]
        },
        {
          columns: [
            [
              {
                text: 'Huấn luyện viên : ' + this.evaluation.coach.name,
                fontSize: 12,
                bold: true
              },
              {
                text: 'Học viên : ' + this.evaluation.student.name,
                fontSize: 12,
                bold: true
              },
              {
                text: 'Mã học viên : ' + this.evaluation.student.studentId,
                fontSize: 12,
                bold: true
              },
              {
                text: 'Lớp : ' + this.evaluation.classes.name,
                fontSize: 12,
                bold: true
              },
              {
                text: 'Chương trình học : BOOTCAMP JAVA',
                fontSize: 12,
                bold: true
              },
              {
                text: 'Hình thức đào tạo : <Full-time 8x5, Part-time 4x5, Part-time 3x3>',
                fontSize: 12,
                bold: true
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
          margin: [0, 0, 0, 180]
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
      ],
      defaultStyle: {
        font: 'MyriadPro'
      }
    };
  }

  getEvaluationDetailObject() {
    return {
      table: {
        widths: ['*', 'auto', 100],
        body: [
          [
            {
              text: 'CHUẨN ĐẦU RA',
              style: 'tableHeader',
              colSpan: 2,
              alignment: 'center'
            },
            {},
            {
              text: 'ĐÁNH GIÁ',
              style: 'tableHeader',
              alignment: 'center'
            }
          ],
          ...this.outcomeList.map(outcome => {
            return [{
              text: outcome.title,
              style: 'tableHeader',
              colSpan: 3,
              alignment: 'center',
            }, {}, {}];
          }),
          ...this.evaluationDetailList.map(evaluationDetail => {
            return [
              {
                text: evaluationDetail.skills.skillId,
                alignment: 'right'
              },
              {
                text: evaluationDetail.skills.name,
                alignment: 'left'
              },
              {
                text: evaluationDetail.evaluation,
                alignment: 'left'
              }];
          })
        ],
      }
    };

  }

  getAllEvaluation() {
    this.evaluationService.getAllEvaluation().subscribe(evaluationList => {
      this.evaluationList = evaluationList;
      this.evaluation = evaluationList[0];
    });
  }

  getAllEvaluationDetail() {
    this.evaluationDetailService.getAllEvaluationDetail().subscribe(evaluationDetailList => {
      this.evaluationDetailList = evaluationDetailList;
    });
  }

  getAllOutcome() {
    this.outcomeService.getAllOutcome().subscribe(outcomeList => {
      this.outcomeList = outcomeList;
      // this.outcomeList.map(outcome => {
      //   this.getAllCategoryByOutcome(outcome);
      // });
    });
  }

  // getAllCategoryByOutcome(outcome: Outcome) {
  //   this.outcomeService.getAllCategoryByOutcome(outcome.id).subscribe(categoryList => {
  //     outcome.categories = categoryList;
  //   });
  // }
}
