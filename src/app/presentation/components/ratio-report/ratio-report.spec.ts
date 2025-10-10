import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatioReport } from './ratio-report';

describe('RatioReport', () => {
  let component: RatioReport;
  let fixture: ComponentFixture<RatioReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatioReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatioReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
