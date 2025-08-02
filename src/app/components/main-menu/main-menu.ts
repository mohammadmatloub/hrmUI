import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-main-menu',
  imports: [CommonModule, MenubarModule, MenuModule, RouterModule],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss'
})
export class MainMenu {
  menuItems = [
    { label: 'خانه', icon: 'pi pi-home', routerLink: ['/'] },
    {
      label: 'تعاریف', icon: 'pi pi-align-justify', items: [
        { label: 'سال', icon: 'pi pi-calendar', routerLink: ['/years'] },
        { label: 'ماه', icon: 'pi pi-calendar', routerLink: ['/months'] },
        { label: 'خدمات', icon: 'pi pi-cog', routerLink: ['/services'] },
        { label: 'شغل‌ها', icon: 'pi pi-users', routerLink: ['/occupations'] },
        { label: 'بخش‌ها', icon: 'pi pi-sitemap', routerLink: ['/departments'] },
        { label: 'سازمان‌ها', icon: 'pi pi-building', routerLink: ['/organizations'] }
      ]

    },
    
    {
      label: 'ثبت', icon: 'pi pi-pencil', items: [
        { label: 'خدمات', routerLink: ['/medicalPerMonth'] },
        { label: 'کارکرد پرسنل', routerLink: ['/personnelAttendance'] }
      ]
    },

    {
      label: 'گزارشات', icon: 'pi pi-chart-bar', items: [
        { label: 'ماهانه', routerLink: ['/reports/monthly'] },
        { label: 'سالانه', routerLink: ['/reports/annual'] }
      ]
    },
  ];

}
