import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationList } from './occupation-list';

describe('OccupationList', () => {
  let component: OccupationList;
  let fixture: ComponentFixture<OccupationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
