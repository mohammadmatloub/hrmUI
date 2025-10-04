import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormsModule} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Department } from '../../../../core/domain/department.model';
import {Category} from '../../../../core/domain/category.model';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-department-form',
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, Select],
  templateUrl: './department-form.html',
  styleUrl: './department-form.scss',
})
export class DepartmentForm implements OnChanges {
  @Input() department?: Department;
  @Input() categories?: Category[];
  @Output() save: EventEmitter<Department> = new EventEmitter<Department>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  model: Department = { id: 0, name: '', code: 0 };
  categoryList?: Category[]=[];

  ngOnChanges(): void {
    this.categoryList = this.categories;
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
