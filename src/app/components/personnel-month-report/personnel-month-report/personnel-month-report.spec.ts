import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelMonthReport } from './personnel-month-report';

describe('PersonnelMonthReport', () => {
  let component: PersonnelMonthReport;
  let fixture: ComponentFixture<PersonnelMonthReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelMonthReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelMonthReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
