import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPerMonthForm } from './medical-per-month-form';

describe('MedicalPerMonthForm', () => {
  let component: MedicalPerMonthForm;
  let fixture: ComponentFixture<MedicalPerMonthForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalPerMonthForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalPerMonthForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
