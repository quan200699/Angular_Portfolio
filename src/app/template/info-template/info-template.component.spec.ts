import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTemplateComponent } from './info-template.component';

describe('InfoTemplateComponent', () => {
  let component: InfoTemplateComponent;
  let fixture: ComponentFixture<InfoTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
