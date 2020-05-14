import {TestBed, async, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {CoachService} from './coach.service';
import {Coach} from '../../model/coach';
import {HttpResponse} from '@angular/common/http';

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
      req.flush(coachList);
      expect(req.request.method).toBe('GET');
      httpMock.verify();
    })));
  it('should return a coach has id = 1 when using findById function with id = 1', async(inject([HttpTestingController, CoachService],
    (httpClient: HttpTestingController, coachService: CoachService) => {
      coachService.getCoach(1).subscribe(coach => {
        expect(coach);
      });
      let req = httpMock.expectOne(API_URL + `/coaches/1`);
      expect(req.request.method).toBe('GET');
      httpMock.verify();
    })));
  it('should return null when using findById function with id = 0', async(inject([HttpTestingController, CoachService],
    (httpClient: HttpTestingController, coachService: CoachService) => {
      coachService.getCoach(0).subscribe(coach => {
        expect(coach).toBeNull();
      });

      let req = httpMock.expectOne(API_URL + `/coaches/0`);
      expect(req.request.method).toBe('GET');
      httpMock.verify();
    })));
  it('should return a coach when create new coach', async(inject([HttpTestingController, CoachService],
    (httpClient: HttpTestingController, coachService: CoachService) => {
      const coach: Coach = {
        id: 4,
        coachId: '004',
        name: 'quan',
        email: 'quan.nguyen@codegym.vn'
      };
      coachService.createNewCoach(coach).subscribe(newCoach => {
        expect(newCoach).toEqual(coach);
      });

      let req = httpMock.expectOne(API_URL + `/coaches`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(coach)
      httpMock.verify();
    })));
  it('should return a coach with new name when update coach has id = 1', async(inject([HttpTestingController, CoachService],
    (httpClient: HttpTestingController, coachService: CoachService) => {
      const coach: Coach = {
        id: 1,
        coachId: '001',
        name: 'Nguyễn Minh Quân',
        email: 'quan.nguyen@codegym.vn'
      };
      coachService.updateCoachInfo(1, coach).subscribe(newCoach => {
        expect(newCoach).toEqual(coach);
      });
      let req = httpMock.expectOne(API_URL + `/coaches/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(coach)
      httpMock.verify();
    })));
  it('should return 200 status OK when delete coach has id = 1', async(inject([HttpTestingController, CoachService],
    (httpClient: HttpTestingController, coachService: CoachService) => {
      coachService.deleteCoach(1).subscribe(() => {
      });

      let req = httpMock.expectOne(API_URL + `/coaches/1`);
      expect(req.request.method).toBe('DELETE');
      const expectedResponse = new HttpResponse({ status: 404, statusText: 'NOTFOUND'});
      req.flush(coachList);
      httpMock.verify();
    })));
});
