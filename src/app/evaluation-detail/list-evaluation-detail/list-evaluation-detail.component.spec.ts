import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEvaluationDetailComponent } from './list-evaluation-detail.component';

describe('ListEvaluationDetailComponent', () => {
  let component: ListEvaluationDetailComponent;
  let fixture: ComponentFixture<ListEvaluationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEvaluationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEvaluationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
