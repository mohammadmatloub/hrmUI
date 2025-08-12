import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPerMonthImporter } from './medical-per-month-importer';

describe('MedicalPerMonthImporter', () => {
  let component: MedicalPerMonthImporter;
  let fixture: ComponentFixture<MedicalPerMonthImporter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalPerMonthImporter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalPerMonthImporter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
