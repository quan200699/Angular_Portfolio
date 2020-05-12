import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEvaluationComponent } from './info-evaluation.component';

describe('InfoEvaluationComponent', () => {
  let component: InfoEvaluationComponent;
  let fixture: ComponentFixture<InfoEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
