import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Department } from '../../../models/department.model';

@Component({
  selector: 'app-department-form',
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './department-form.html',
  styleUrl: './department-form.scss'
})
export class DepartmentForm implements OnChanges {
  @Input() department?: Department;
  @Output() save = new EventEmitter<Department>();
  @Output() cancel = new EventEmitter<void>();

  model: Department = { id: 0, name: '', code: 0 };

  ngOnChanges() {
    this.model = this.department ? { ...this.department } : { id:0 , name: '' ,code:0};
  }

  onSubmit() {
    this.save.emit(this.model);
  }

  onCancel() {
    this.cancel.emit();
  }
}
