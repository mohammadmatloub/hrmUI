import { Component,OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { Month } from '../../../models/month.model';
import { MonthService } from '../../../services/month.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-month-list',
  imports: [TabsModule,TableModule],
  templateUrl: './month-list.html',
  styleUrl: './month-list.scss'
})
export class MonthList  implements OnInit {
  months: Month[] =[];

  constructor(private monthService :MonthService){

  }

  ngOnInit(): void {
    this.loadMonths();
  }

  loadMonths():void{
    this.monthService.getAll().subscribe(monthList=>{
      this.months = monthList;
    })
  }


}
