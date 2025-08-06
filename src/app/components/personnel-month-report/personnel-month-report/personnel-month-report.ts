import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Occupation } from '../../../models/occupation.model';
import { OccupationService } from '../../../services/occupation.service';
import { ToggleButton } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-personnel-month-report',
  imports: [TableModule, CommonModule,ButtonModule],
  templateUrl: './personnel-month-report.html',
  styleUrl: './personnel-month-report.scss'
})
export class PersonnelMonthReport implements OnInit {

  balanceFrozen: boolean = false;
  occupations: Occupation[] = [];

  constructor(private occupationService: OccupationService) {}

  localData(){
    this.occupationService.getAll().subscribe(data => {
      this.occupations = data;
    });
  }

  ngOnInit(): void {
    this.localData();
  }

 

}
