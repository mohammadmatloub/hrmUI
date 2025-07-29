import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/department.model';
import { DepartmentForm } from '../department-form/department-form';
@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, DialogModule, DepartmentForm],
  templateUrl: './department-list.html',
  styleUrl: './department-list.scss'
})
export class DepartmentList  implements OnInit{

  departments: Department[] = [];
  selectedDepartment ?: Department ;
  displayDialog: boolean = false;
  isEditing: boolean = false;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getAll().subscribe(departments => {
      this.departments = departments;
    });
  }
  addDepartment() {
    this.selectedDepartment = { id: 0, name: '', code: '' };
    this.isEditing = false;
    this.displayDialog = true;
  }
  editDepartment(department: Department): void {
    this.selectedDepartment = { ...department };
    this.isEditing = true;
    this.displayDialog = true;
  }
  showDialog(department?: Department): void {
    this.selectedDepartment = department || { id: 0, name: '', code: '' };
    this.displayDialog = true;
  }


  createDepartment(department: Department): void {
    if (this.isEditing && department.id) {
      this.departmentService.update(department.id, department).subscribe(() => {
        this.loadDepartments();
        this.displayDialog = false;
      });
    } else {
      this.departmentService.create(department).subscribe(() => {
        this.loadDepartments();
        this.displayDialog = false;
      });
    }
  }

  deleteDepartment(id: number): void {
    this.departmentService.delete(id).subscribe(() => {
      this.loadDepartments();
    });
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.selectedDepartment ;
    this.isEditing = false;
  }



}
