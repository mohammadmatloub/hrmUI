import { Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';

import { Year } from '../../../../core/domain/year.model';
import { YearService } from '../../../../infrastructure/services/year.service';

@Component({
  selector: 'app-year-list',
  imports: [TableModule],
  templateUrl: './year-list.html',
  styleUrl: './year-list.scss',
})
export class YearList implements OnInit {
  years: Year[] = [];

  constructor(private yearService: YearService) {}

  ngOnInit(): void {
    this.loadYears();
  }

  loadYears(): void {
    this.yearService.getAll().subscribe((yearList: Year[]): void => {
      this.years = yearList;
    });
  }
}
