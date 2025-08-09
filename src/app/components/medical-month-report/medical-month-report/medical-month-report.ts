import { Component,OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../services/service.service';
import { Service } from '../../../models/service.model';
import { Month } from '../../../models/month.model';
import { MonthService } from '../../../services/month.service';


interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-medical-month-report',
  imports: [TableModule,CommonModule],
  templateUrl: './medical-month-report.html',
  styleUrl: './medical-month-report.scss'
})
export class MedicalMonthReport implements OnInit {
  months: Month[] = [];
  services: Service[] = [];

  constructor(private monthService: MonthService ,private serviceService: ServiceService) {}

 cols: Column[]=[];

  localData(){
    this.serviceService.getAll().subscribe(service => {
      this.services = service;
       this.createColumn(service);
    });
    this.monthService.getAll().subscribe(month => {
      this.months = month;
    });

  }

  ngOnInit(): void {
    this.localData();
   
        
  }

  createColumn(ServiceList : Service[]){
    ServiceList.forEach(service => {
      this.cols.push({ field: "name", header: service.name });
    });
  }
}