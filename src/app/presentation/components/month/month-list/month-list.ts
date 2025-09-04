import { Component, OnInit } from '@angular/core';

import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { Month } from '../../../../core/domain/month.model';
import { MonthService } from '../../../../infrastructure/services/month.service';

@Component({
  selector: 'app-month-list',
  imports: [TabsModule, TableModule],
  templateUrl: './month-list.html',
  styleUrl: './month-list.scss',
})
export class MonthList implements OnInit {
  months: Month[] = [];

  constructor(private monthService: MonthService) {}

  ngOnInit(): void {
    this.loadMonths();
  }

  loadMonths(): void {
    this.monthService.getAll().subscribe((monthList: Month[]): void => {
      this.months = monthList;
    });
  }
}
