import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvaluationDetailComponent } from './create-evaluation-detail.component';

describe('CreateEvaluationDetailComponent', () => {
  let component: CreateEvaluationDetailComponent;
  let fixture: ComponentFixture<CreateEvaluationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEvaluationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEvaluationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
