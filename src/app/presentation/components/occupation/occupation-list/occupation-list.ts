import { Component, OnInit } from '@angular/core';

import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Occupation } from '../../../../core/domain/occupation.model';
import { OccupationService } from '../../../../infrastructure/services/occupation.service';
import {DepartmentService} from '../../../../infrastructure/services/department.service';
import {Department} from '../../../../core/domain/department.model';
import {Button, ButtonDirective} from 'primeng/button';
import {DepartmentForm} from '../../department/department-form/department-form';
import {Dialog} from 'primeng/dialog';
import {CategoryService} from '../../../../infrastructure/services/category.service';
import {OccupationForm} from '../occupation-form/occupation-form';

@Component({
  selector: 'app-occupation-list',
  imports: [TabsModule, TableModule, ButtonDirective, ButtonModule, OccupationForm, Dialog],
  templateUrl: './occupation-list.html',
  styleUrl: './occupation-list.scss',
})
export class OccupationList implements OnInit {
  occupations: Occupation[] = [];
  departments: Department[] = [];
  displayDialog: boolean = false;
  isEditing: boolean = false;
  selectedOccupation?: Occupation;
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

  editOccupation(occupation:Occupation): void {
    this.selectedOccupation = occupation;
    this.isEditing = true;
    this.displayDialog = true;
  }
  deleteOccupation(id :number): void {
    this.occupationService.delete(id).subscribe(():void => {this.loadOccupation();});
  }
  detailOccupation(): void {}

  addOccupation(): void {
    this.selectedOccupation = {  name: '', code: 0 };
    this.isEditing = false;
    this.displayDialog = true;
  }
  createOccupation(occupation : Occupation): void {
    if (this.isEditing && occupation.id) {
      this.occupationService
        .update(occupation.id, occupation)
        .subscribe((): void => {
          this.loadOccupation();
          this.displayDialog = false;
        });
    } else {
      this.occupationService.create(occupation).subscribe((): void => {
        this.loadOccupation();
        this.displayDialog = false;
      });
    }
  }
  closeDialog(): void {
    this.displayDialog = false;
    this.selectedOccupation;
    this.isEditing = false;
  }
}
