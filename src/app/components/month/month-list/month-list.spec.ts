import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthList } from './month-list';

describe('MonthList', () => {
  let component: MonthList;
  let fixture: ComponentFixture<MonthList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
