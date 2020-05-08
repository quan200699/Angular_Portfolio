import {Component, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Evaluations} from '../model/evaluations';
import {EvaluationService} from '../service/evaluation/evaluation.service';
import {EvaluationDetail} from '../model/evaluation-detail';
import {EvaluationDetailService} from '../service/evaluation-detail/evaluation-detail.service';

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

  constructor(private evaluationService: EvaluationService,
              private evaluationDetailService: EvaluationDetailService) {
    this.getAllEvaluation();
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
          margin: [0, 0, 0, 20]
        },
        {
          text: '1.\tKết quả bài thi lý thuyết và thực hành cuối module của học viên\n' +
            '2.\tQuá trình học của học viên: bài tập, bài thực hành, quiz,…\n',
          italics: true,
          fontSize: 11,
          alignment: 'left',
          margin: [50, 0, 0, 20]
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
          bold: true
        },
        {
          text: '\n2. Nhận xét chung\n',
          fontSize: 12,
          bold: true
        },
        {
          text: this.evaluation.description + '\n',
          fontSize: 12
        },
        {
          text: '\nHà Nội, ngày ' + date.getDay() + ' tháng ' + date.getMonth() + ' năm ' + date.getFullYear(),
          alignment: 'right',
          fontSize: 12,
          margin: [0, 0, 0, 20],
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
        widths: ['*', 100],
        body: [
          [{
            text: 'CHUẨN ĐẦU RA',
            style: 'tableHeader'
          },
            {
              text: 'ĐÁNH GIÁ',
              style: 'tableHeader'
            }
          ],
          ...this.evaluationDetailList.map(evaluationDetail => {
            return [evaluationDetail.skills.name, evaluationDetail.evaluation];
          })
        ]
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
}
