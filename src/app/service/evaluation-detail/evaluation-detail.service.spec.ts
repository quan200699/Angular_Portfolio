import { TestBed } from '@angular/core/testing';

import { EvaluationDetailService } from './evaluation-detail.service';

describe('EvaluationDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluationDetailService = TestBed.get(EvaluationDetailService);
    expect(service).toBeTruthy();
  });
});
