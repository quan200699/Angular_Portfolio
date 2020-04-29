import {TestBed, async, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {CoachService} from './coach.service';
import {Coach} from '../../model/coach';

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
  it(`should return a list coach when findAll`, async(inject([HttpTestingController, CoachService],
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
  it('should return a coach has id = 1 when using findById function with id = 1', async(inject([HttpTestingController, CoachService],
    (httpClient: HttpTestingController, coachService: CoachService) => {
      coachService.getCoach(1).subscribe(coach => {
        expect(coach.name).toBe('Nguyen Minh Quan');
      });
    })));
  it('should return null when using findById function with id = 0', async(inject([HttpTestingController, CoachService],
    (httpClient: HttpTestingController, coachService: CoachService) => {
      coachService.getCoach(0).subscribe(coach => {
        expect(coach).toBeNull();
      });
    })));
  it('should return a list coach has size increase when create new coach', async(inject([HttpTestingController, CoachService],
    (httpClient: HttpTestingController, coachService: CoachService) => {
      const coach: Coach = {
        id: 4,
        coachId: '004',
        name: 'quan',
        email: 'quan.nguyen@codegym.vn'
      };
      coachService.createNewCoach(coach).subscribe(() => {
        expect(coachList.length).toBe(4);
      });
    })));
  it('should return a coach with new name when update coach has id = 1', async(inject([HttpTestingController, CoachService],
    (httpClient: HttpTestingController, coachService: CoachService) => {
      const coach: Coach = {
        id: 1,
        coachId: '001',
        name: 'Nguyễn Minh Quân',
        email: 'quan.nguyen@codegym.vn'
      };
      coachService.updateCoachInfo(1, coach).subscribe(() => {
        expect(coach.name).toBe('Nguyễn Minh Quân');
      });
    })));
  it('should return a list has size decease when delete coach has id = 1', async(inject([HttpTestingController, CoachService],
    (httpClient: HttpTestingController, coachService: CoachService) => {
      coachService.deleteCoach(1).subscribe(() => {
        expect(coachList.length).toBe(2);
      });
    })));
});
