import {ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges,PLATFORM_ID, inject, effect} from '@angular/core';
import {TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {Month} from '../../../core/domain/month.model';
import {Year} from '../../../core/domain/year.model';
import {Organization} from '../../../core/domain/organization.model';
import {MonthService} from '../../../infrastructure/services/month.service';

import {OrganizationService} from '../../../infrastructure/services/organization.service';
import {YearService} from '../../../infrastructure/services/year.service';
import {RatioServiceReportService} from '../../../infrastructure/services/ratioServiceReport.service';
import {RatioReportType, RatioServiceRes, RatioServiceSearch} from '../../../core/domain/ratioServiceReport.model';
import { TabsModule} from 'primeng/tabs';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import {MultiSelectModule} from 'primeng/multiselect';



@Component({
  selector: 'app-ratio-report',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    ToastModule,
    Select,
    FormsModule,
    ChartModule,
    PanelModule,
    MultiSelectModule,
    TabsModule
  ],
  templateUrl: './ratio-report.html',
  styleUrl: './ratio-report.scss'
})
export class RatioReport implements OnInit {
  months: Month[] = [];
  selectedMonths?: Month[]=[];

  years: Year[] = [];
  selectedYear?: Year;

  organizations: Organization[] = [];
  selectedOrganization?: Organization;
  ratioServiceResList:RatioServiceRes[]=[];

  reportSearchList:RatioServiceSearch[] =[];


  constructor(
    private ratioService: RatioServiceReportService,
    private monthService: MonthService,
    private organizationService: OrganizationService,
    private yearService: YearService,
    private cd: ChangeDetectorRef
  ) {}

  localData(): void {
    this.monthService.getAll().subscribe((month: Month[]): void => {
      this.months = month;
    });
    this.organizationService
      .getAll()
      .subscribe((organizaion: Organization[]): void => {
        this.organizations = organizaion;
      });
    this.yearService.getAll().subscribe((year: Year[]): void => {
      this.years = year;
    });
  }

  ngOnInit(): void {
    this.localData();
  }

  // The selected tab index
  selectedTab: number = 0;

  addReportSearch(): void {
    if (this.selectedYear && this.selectedOrganization) {
      let search: RatioServiceSearch = {
        yearID: this.selectedYear.id ?? 0,
        yearName: this.selectedYear.name,
        organizationID: this.selectedOrganization.id ?? 0,
        organizationName: this.selectedOrganization.name,
        months: this.selectedMonths ?? [],
        ratioReportType: this.selectedTab
      };
      this.reportSearchList.push(search);
    }
  }

  deleteReportSearch(search: RatioServiceSearch): void {
    this.reportSearchList=  this.reportSearchList.filter(item => item !== search);
  }


  search(tabIndex:number): void {
      this.ratioService
        .getAll(this.reportSearchList)
        .subscribe((person: RatioServiceRes[]) =>{
            this.ratioServiceResList = person;
           // this.data=this.convertRatioDataToChart(person);
          }

        );

      console.log(this.ratioServiceResList);
  }

  calculateCountTotal():number {
    let total = 0;
    for (let ratio of this.ratioServiceResList) {
      //total += ratio.count;
    }

    return total;
  }

  calculateWithCountTotal() {
    let total = 0;
    for (let ratio of this.ratioServiceResList) {
      //total += ratio.countWith;
    }

    return  total;
  }

  onTabChange(index: number) {
    console.log('تب فعال:', index);
    this.search(index);

  }


  data: any;

  options: any;

  platformId = inject(PLATFORM_ID);


  /*convertRatioDataToChart(ratios: RatioServiceRes[]): any {
    const labels = Array.from(new Set(ratios.map(r => r.monthName)));
    const categories = Array.from(new Set(ratios.map(r => r.categoryName)));

    const documentStyle = getComputedStyle(document.documentElement);
    const colorVars = ['--p-cyan-500', '--p-gray-500', '--p-green-500', '--p-orange-500', '--p-pink-500'];

    const datasets = categories.map((category, index) => ({
      label: category,
      backgroundColor: documentStyle.getPropertyValue(colorVars[index % colorVars.length]),
      borderColor: documentStyle.getPropertyValue(colorVars[index % colorVars.length]),
      data: labels.map(month => {
        const item = ratios.find(r => r.categoryName === category && r.monthName === month);
        return item ? item.count : 0;
      })
    }));

    return { labels, datasets };

  }
*/

}
