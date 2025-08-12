import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelAttendanceImporter } from './personnel-attendance-importer';

describe('PersonnelAttendanceImporter', () => {
  let component: PersonnelAttendanceImporter;
  let fixture: ComponentFixture<PersonnelAttendanceImporter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelAttendanceImporter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelAttendanceImporter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
