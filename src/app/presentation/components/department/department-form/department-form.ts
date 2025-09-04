import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Department } from '../../../../core/domain/department.model';

@Component({
  selector: 'app-department-form',
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './department-form.html',
  styleUrl: './department-form.scss',
})
export class DepartmentForm implements OnChanges {
  @Input() department?: Department;
  @Output() save: EventEmitter<Department> = new EventEmitter<Department>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  model: Department = { id: 0, name: '', code: 0 };

  ngOnChanges(): void {
    this.model = this.department
      ? { ...this.department }
      : { id: 0, name: '', code: 0 };
  }

  onSubmit(): void {
    this.save.emit(this.model);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
