import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ButtonDirective, ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {Select} from 'primeng/select';
import {Department} from '../../../../core/domain/department.model';

import {Occupation} from '../../../../core/domain/occupation.model';

@Component({
  selector: 'app-occupation-form',
  imports: [
    ButtonDirective,
    FormsModule,
    InputText,
    NgIf,
    ButtonModule,
    ReactiveFormsModule,
    Select
  ],
  templateUrl: './occupation-form.html',
  styleUrl: './occupation-form.scss'
})
export class OccupationForm implements OnChanges{
  @Input() occupation?: Occupation;
  @Input() departments?: Department[];
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output()save: EventEmitter<Occupation> = new EventEmitter<Occupation>();

  model: Occupation = {  name: '', code: 0 };
  departmentList?: Department[] = [];
  ngOnChanges(changes: SimpleChanges) {
    this.departmentList = this.departments
    this.model = this.occupation ? {...this.occupation} : {name: "", code: 0};
  }
  onSubmit(): void {
    this.save.emit(this.model);
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
