import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelAttendanceForm } from './personnel-attendance-form';

describe('PersonnelAttendanceForm', () => {
  let component: PersonnelAttendanceForm;
  let fixture: ComponentFixture<PersonnelAttendanceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelAttendanceForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelAttendanceForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
