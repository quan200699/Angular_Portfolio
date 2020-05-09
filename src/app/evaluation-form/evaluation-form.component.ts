import {Component, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Evaluations} from '../model/evaluations';
import {EvaluationService} from '../service/evaluation/evaluation.service';
import {EvaluationDetail} from '../model/evaluation-detail';
import {EvaluationDetailService} from '../service/evaluation-detail/evaluation-detail.service';
import {Outcome} from '../model/outcome';
import {OutcomeService} from '../service/outcome/outcome.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
            image: 'data:image/png;base64,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',
          }
        ];
      },
      footer: {
        columns: [
          {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAAACCAIAAAD9+Fg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVDhPY9DQaBhFgw2NxsrgQxoNAKTx22Ex6+j1AAAAAElFTkSuQmCC',
            width: 80
          },
          {
            text: 'www.codegym.vn',
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
          color: 'indigo'
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
          margin: [0, 0, 0, 50]
        },
        {
          text: '\n2. Nhận xét chung\n',
          fontSize: 12,
          bold: true
        },
        {
          text: this.evaluation.description + '\n',
          fontSize: 12,
          margin: [0, 0, 0, 80]
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
      ]
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
      this.outcomeList.map(outcome => {
        this.getAllCategoryByOutcome(outcome);
      });
    });
  }

  getAllCategoryByOutcome(outcome: Outcome) {
    this.outcomeService.getAllCategoryByOutcome(outcome.id).subscribe(categoryList => {
      outcome.categories = categoryList;
    });
  }
}
