import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalMonthReport } from './medical-month-report';

describe('MedicalMonthReport', () => {
  let component: MedicalMonthReport;
  let fixture: ComponentFixture<MedicalMonthReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalMonthReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalMonthReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
