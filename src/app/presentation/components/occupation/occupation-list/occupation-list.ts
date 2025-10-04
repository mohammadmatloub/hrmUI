import { Component, OnInit } from '@angular/core';

import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Occupation } from '../../../../core/domain/occupation.model';
import { OccupationService } from '../../../../infrastructure/services/occupation.service';
import {DepartmentService} from '../../../../infrastructure/services/department.service';
import {Department} from '../../../../core/domain/department.model';
import {Button, ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-occupation-list',
  imports: [TabsModule, TableModule, ButtonDirective,ButtonModule],
  templateUrl: './occupation-list.html',
  styleUrl: './occupation-list.scss',
})
export class OccupationList implements OnInit {
  occupations: Occupation[] = [];
  departments: Department[] = [];
  constructor(
    private occupationService: OccupationService,
    private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.loadOccupation();
  }

  loadOccupation(): void {
    this.occupationService
      .getAll()
      .subscribe((occupationList: Occupation[]): void => {
        this.occupations = occupationList;
      });

    this.departmentService
      .getAll()
      .subscribe((departmentList: Department[]): void => {
      this.departments = departmentList;
    })
  }

  editOccupation(): void {}
  deleteOccupation(): void {
  }
  detailOccupation(): void {}
  addOccupation(): void {}
}
