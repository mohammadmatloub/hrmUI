import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelAttendanceList } from './personnel-attendance-list';

describe('PersonnelAttendanceList', () => {
  let component: PersonnelAttendanceList;
  let fixture: ComponentFixture<PersonnelAttendanceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelAttendanceList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelAttendanceList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
