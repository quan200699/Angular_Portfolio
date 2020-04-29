import {TestBed, async, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {CoachService} from './coach.service';

const API_URL = `${environment.apiUrl}`;

describe('CoachService', () => {

  const coachList = [
    {
      'coachId': '001',
      'id': 1,
      'name': 'Nguyen Minh Quan',
      'email': 'quan.nguyen@codegym.vn'
    },
    {
      'coachId': '002',
      'id': 2,
      'name': 'Vu Kieu Anh',
      'email': 'anh.vu@codegym.vn'
    },
    {
      'coachId': '003',
      'id': 3,
      'name': 'Dang Huy Hoa',
      'email': 'hoa.dang@codegym.vn'
    }
  ];
  let coachService: CoachService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CoachService
      ],
    });

    coachService = TestBed.get(CoachService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it(`should return a list coach`, async(inject([HttpTestingController, CoachService],
    (httpClient: HttpTestingController, coachService: CoachService) => {
      coachService.getAllCoach()
        .subscribe((coach: any) => {
          expect(coach.length).toBe(3);
        });

      let req = httpMock.expectOne(API_URL + '/coaches');
      expect(req.request.method).toBe('GET');

      req.flush(coachList);
      httpMock.verify();
    })));
});
