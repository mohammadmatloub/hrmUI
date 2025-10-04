import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';

import { DepartmentForm } from '../department-form/department-form';
import { Department } from '../../../../core/domain/department.model';
import { DepartmentService } from '../../../../infrastructure/services/department.service';
import { CategoryService } from '../../../../infrastructure/services/category.service';
import {Category} from '../../../../core/domain/category.model';
@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    DepartmentForm,
  ],
  templateUrl: './department-list.html',
  styleUrl: './department-list.scss',
})
export class DepartmentList implements OnInit {
  departments: Department[] = [];
  categories: Category[] = [];
  selectedDepartment?: Department;
  displayDialog: boolean = false;
  isEditing: boolean = false;


  constructor(private departmentService: DepartmentService , private categoryService : CategoryService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService
      .getAll()
      .subscribe((departments: Department[]): void => {
        this.departments = departments;
      });
    this.categoryService.getAll().subscribe((categories: Category[]): void => {
      this.categories =categories;
    })
    this.categories.length;
  }

  addDepartment(): void {
    this.selectedDepartment = { id: 0, name: '', code: 0 };
    this.isEditing = false;
    this.displayDialog = true;
  }

  editDepartment(department: Department): void {
    this.selectedDepartment = { ...department };
    this.isEditing = true;
    this.displayDialog = true;
  }
  showDialog(department?: Department): void {

    this.displayDialog = true;
  }

  createDepartment(department: Department): void {
    if (this.isEditing && department.id) {
      this.departmentService
        .update(department.id, department)
        .subscribe((): void => {
          this.loadDepartments();
          this.displayDialog = false;
        });
    } else {
      this.departmentService.create(department).subscribe((): void => {
        this.loadDepartments();
        this.displayDialog = false;
      });
    }
  }

  deleteDepartment(id: number): void {
    this.departmentService.delete(id).subscribe((): void => {
      this.loadDepartments();
    });
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.selectedDepartment;
    this.isEditing = false;
  }
}
