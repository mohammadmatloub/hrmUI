import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationForm } from './occupation-form';

describe('OccupationForm', () => {
  let component: OccupationForm;
  let fixture: ComponentFixture<OccupationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
