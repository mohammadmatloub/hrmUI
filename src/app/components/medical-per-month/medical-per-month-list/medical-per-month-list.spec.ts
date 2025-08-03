import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPerMonthList } from './medical-per-month-list';

describe('MedicalPerMonthList', () => {
  let component: MedicalPerMonthList;
  let fixture: ComponentFixture<MedicalPerMonthList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalPerMonthList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalPerMonthList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
