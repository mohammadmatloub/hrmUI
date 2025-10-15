import {
  ChangeDetectorRef,
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Select } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { ChartModule } from 'primeng/chart';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';

import { Month } from '../../../core/domain/month.model';
import { Year } from '../../../core/domain/year.model';
import { Organization } from '../../../core/domain/organization.model';
import { MonthService } from '../../../infrastructure/services/month.service';
import { OrganizationService } from '../../../infrastructure/services/organization.service';
import { YearService } from '../../../infrastructure/services/year.service';
import { RatioServiceReportService } from '../../../infrastructure/services/ratioServiceReport.service';
import {
  RatioServiceRes,
  RatioServiceResDetail,
  RatioServiceSearch,
} from '../../../core/domain/ratioServiceReport.model';

@Component({
  selector: 'app-ratio-report',
  templateUrl: './ratio-report.html',
  styleUrl: './ratio-report.scss',
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
    TabsModule,
  ],
})
export class RatioReport implements OnInit {
  //#region properties

  // The selected tab index
  selectedTab: number = 0;
  data: any;
  options: any;

  chartDataWithoutOvertime: any;
  chartDataWithOvertime: any;
  chartOptions: any;

  // پالت رنگی برای خدمات مختلف
  private readonly colorPalette: string[] = [
    '#FF6384', // صورتی
    '#36A2EB', // آبی
    '#FFCE56', // زرد
    '#4BC0C0', // فیروزه‌ای
    '#9966FF', // بنفش
    '#FF9F40', // نارنجی
    '#FF6384', // صورتی تیره
    '#C9CBCF', // خاکستری
    '#4BC0C0', // سبز دریایی
    '#FF9F40', // نارنجی روشن
  ];

  platformId = inject(PLATFORM_ID);

  months: Month[] = [];
  selectedMonths?: Month[] = [];

  years: Year[] = [];
  selectedYear?: Year;

  organizations: Organization[] = [];
  selectedOrganization?: Organization;
  ratioServiceResList: RatioServiceRes[] = [];

  reportSearchList: RatioServiceSearch[] = [];

  //#endregion

  //#region contructor

  constructor(
    private ratioService: RatioServiceReportService,
    private monthService: MonthService,
    private organizationService: OrganizationService,
    private yearService: YearService,
    private cdr: ChangeDetectorRef
  ) {}

  //#endregion

  //#region angular lifecycle hooks

  ngOnInit(): void {
    this.localData();
    this.initializeChartOptions();
  }

  //#endregion

  //#region protected methods

  protected addReportSearch(): void {
    if (this.selectedYear && this.selectedOrganization) {
      let search: RatioServiceSearch = {
        yearID: this.selectedYear.id ?? 0,
        yearName: this.selectedYear.name,
        organizationID: this.selectedOrganization.id ?? 0,
        organizationName: this.selectedOrganization.name,
        months: this.selectedMonths ?? [],
        ratioReportType: this.selectedTab,
      };
      this.reportSearchList.push(search);

      this.search(this.selectedTab);
    }
  }

  protected deleteReportSearch(search: RatioServiceSearch): void {
    this.reportSearchList = this.reportSearchList.filter(
      (item: RatioServiceSearch): boolean => item !== search
    );

    if (this.reportSearchList.length > 0) {
      this.search(this.selectedTab);
    } else {
      // اگر لیست خالی شد، چارت‌ها را پاک کن
      this.clearCharts();
    }
  }

  protected calculateCountTotal(): number {
    let total: number = 0;
    for (let ratio of this.ratioServiceResList) {
      //total += ratio.count;
    }

    return total;
  }

  protected calculateWithCountTotal(): number {
    let total: number = 0;
    for (let ratio of this.ratioServiceResList) {
      //  for (let detail of ratio.ratioServiceResDetailWrappers) {
      //   total += detail.countWith;
      // }
    }

    return total;
  }

  protected onTabChange(index: number): void {
    console.log('تب فعال:', index);
    this.selectedTab = index;
    this.search(index);
  }

  // محاسبه مجموع برای هر سازمان
  protected getTotalForOrganization(
    orgName: string,
    valueField: 'count' | 'countWith'
  ): number {
    return this.ratioServiceResList.reduce((total, category) => {
      const detail = category.ratioServiceResDetailWrappers.find(
        (d) => d.organizationName === orgName
      );
      return total + (detail ? detail[valueField] : 0);
    }, 0);
  }

  //#endregion

  //#region private methods

  private localData(): void {
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

  private search(tabIndex: number): void {
    if (this.reportSearchList.length === 0) return;

    this.ratioService
      .getAll(this.reportSearchList)
      .subscribe((data: RatioServiceRes[]): void => {
        this.ratioServiceResList = data;
        // this.data=this.convertRatioDataToChart(data);

        this.updateCharts();
        this.cdr.detectChanges();
      });

    console.log(this.ratioServiceResList);
  }

  private initializeChartOptions(): void {
    this.chartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          rtl: true,
          labels: {
            font: {
              family: 'IRANSans, Tahoma, Arial',
              size: 12,
            },
            usePointStyle: true,
            padding: 15,
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          rtl: true,
          titleFont: {
            family: 'IRANSans, Tahoma, Arial',
          },
          bodyFont: {
            family: 'IRANSans, Tahoma, Arial',
          },
          callbacks: {
            label: (context: any) => {
              const label = context.dataset.label || '';
              const value = context.parsed.y.toFixed(2);
              return `${label}: ${value}`;
            },
          },
        },
      },
      // برای نمایش رنگ‌ها به صورت ستونی روی هم (stacked)
      datasets: {
        bar: {
          borderRadius: 6,
          borderSkipped: false,
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            font: {
              family: 'IRANSans, Tahoma, Arial',
              size: 11,
            },
            // Don't rotate labels; shorten them instead to keep them horizontal
            maxRotation: 0,
            minRotation: 0,
            autoSkip: true,
            autoSkipPadding: 8,
            callback: function (value: any, index: number) {
              // value can be string label; truncate long labels with ellipsis
              let label = value;
              if (typeof label === 'string' && label.length > 30) {
                label = label.slice(0, 28) + '...';
              }
              // show index starting from 1
              return (index + 1).toString();
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: {
            font: {
              family: 'IRANSans, Tahoma, Arial',
              size: 11,
            },
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
        },
      },
    };
  }

  private updateCharts(): void {
    if (!this.ratioServiceResList || this.ratioServiceResList.length === 0) {
      this.clearCharts();
      return;
    }

    // Labels: one label per report search (each request becomes one column)
    const labels = this.reportSearchList.map((r: any): string => {
      // ساخت لیبل خوانا: سازمان - سال (ماه‌ها اگر وجود داشته باشند)
      const months =
        r.months && r.months.length
          ? r.months.map((m: any) => m.name).join(',')
          : '';
      const monthPart = months ? ` (${months})` : '';
      const yearPart = r.yearName ? ` - ${r.yearName}` : '';
      return `${r.organizationName || ''}${yearPart}${monthPart}`;
    });

    // ایجاد دیتاست‌ها برای هر خدمت، هر دیتاست مقادیر را مطابق با ترتیب reportSearchList تولید می‌کند
    const datasetsWithoutOvertime = this.createDatasets(labels.length, 'count');
    const datasetsWithOvertime = this.createDatasets(
      labels.length,
      'countWith'
    );

    this.chartDataWithoutOvertime = {
      labels: labels,
      datasets: datasetsWithoutOvertime,
    };

    this.chartDataWithOvertime = {
      labels: labels,
      datasets: datasetsWithOvertime,
    };

    // Calculate max stacked sum per label so the y-axis can scale appropriately
    const maxWithout = this.getMaxStackedSum(
      datasetsWithoutOvertime,
      labels.length
    );
    const maxWith = this.getMaxStackedSum(datasetsWithOvertime, labels.length);
    const overallMax = Math.max(maxWithout, maxWith);

    if (this.chartOptions && this.chartOptions.scales && overallMax > 0) {
      // if values are small (<1) ensure axis still shows them by using at least 1
      const suggested = Math.max(
        overallMax * 1.15,
        overallMax < 1 ? 1 : overallMax * 1.15
      );
      this.chartOptions.scales.y.suggestedMax = suggested;
      // reassign top-level object so the chart component detects the change
      this.chartOptions = { ...this.chartOptions };
    }
  }

  // محاسبه بیشینهٔ مجموعِ ستَک‌شده برای هر ایندکس/لیبل
  private getMaxStackedSum(datasets: any[], labelCount: number): number {
    if (!datasets || datasets.length === 0 || labelCount === 0) return 0;
    let max = 0;
    for (let i = 0; i < labelCount; i++) {
      let sum = 0;
      for (let ds of datasets) {
        const v = Number(ds.data && ds.data[i] ? ds.data[i] : 0);
        sum += isNaN(v) ? 0 : v;
      }
      if (sum > max) max = sum;
    }
    return max;
  }

  private clearCharts(): void {
    this.chartDataWithoutOvertime = null;
    this.chartDataWithOvertime = null;
  }

  private getUniqueOrganizations(): string[] {
    const organizationsSet = new Set<string>();

    this.ratioServiceResList.forEach((category) => {
      category.ratioServiceResDetailWrappers.forEach((detail): void => {
        organizationsSet.add(detail.organizationName as string);
      });
    });

    return Array.from(organizationsSet);
  }

  /**
   * Create datasets for charts.
   * - If `labelsOrCount` is an array of labels, its length will be used.
   * - If it's a number, that number is used as the number of columns.
   * Mapping strategy: for each category we take values from `ratioServiceResDetailWrappers`
   * by index. This assumes the service returns detail rows in the same order as
   * `reportSearchList` (one detail per search row). If a detail is missing for
   * a given index, we fallback to 0.
   */
  private createDatasets(
    labelsOrCount: string[] | number,
    valueField: 'count' | 'countWith'
  ): any[] {
    const count = Array.isArray(labelsOrCount)
      ? labelsOrCount.length
      : labelsOrCount;

    return this.ratioServiceResList.map((category, index) => {
      // برای هر ستون (معادل یک ردیف جستجو) مقدار را از آرایه جزئیات بر اساس اندیس می‌گیریم
      const data = Array.from({ length: count }, (_v, idx) => {
        const detail = category.ratioServiceResDetailWrappers[idx];
        const val = detail ? detail[valueField] : 0;
        return Number(val) || 0;
      });

      return {
        label: category.categoryName,
        data: data,
        backgroundColor: this.colorPalette[index % this.colorPalette.length],
        borderColor: this.colorPalette[index % this.colorPalette.length],
        borderWidth: 1,
        // کنترل پهنای میله‌ها تا کشیدگی کمتر شود (برای stacked این‌ها مناسبند)
        barPercentage: 0.6,
        categoryPercentage: 0.7,
        // ضخامت حداکثری برای میله‌ها در صورت نیاز
        maxBarThickness: 56,
      };
    });
  }

  // محاسبه مجموع یک ستون (بر اساس ایندکس لیبل) برای فیلد مشخص
  protected getTotalForLabelIndex(
    index: number,
    valueField: 'count' | 'countWith'
  ): number {
    return this.ratioServiceResList.reduce((total, category) => {
      const detail = category.ratioServiceResDetailWrappers[index];
      return total + (detail ? detail[valueField] : 0);
    }, 0);
  }

  //#endregion
}
