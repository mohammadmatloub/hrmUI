import { Component, OnInit } from '@angular/core';
import { Year } from '../../../models/year.model';
import { YearService } from '../../../services/year.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-year-list',
  imports: [TableModule],
  templateUrl: './year-list.html',
  styleUrl: './year-list.scss'
})
export class YearList implements OnInit {
  years: Year[] =[];

  constructor(private yearService :YearService){

  }

  ngOnInit(): void {
    this.loadYears();
  }

  loadYears():void{
    this.yearService.getAll().subscribe(yearList=>{
      this.years = yearList;
    })
  }
}
