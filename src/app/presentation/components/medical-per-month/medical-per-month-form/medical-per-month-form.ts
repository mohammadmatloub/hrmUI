import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { Panel } from 'primeng/panel';
import { Select } from 'primeng/select';

import { MedicalPerMonth } from '../../../../core/domain/medicalPerMonth.model';
import { Organization } from '../../../../core/domain/organization.model';
import { Month } from '../../../../core/domain/month.model';
import { Year } from '../../../../core/domain/year.model';
import { Service } from '../../../../core/domain/service.model';

@Component({
  selector: 'app-medical-per-month-form',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    InputNumber,
    Panel,
    Select,
  ],
  templateUrl: './medical-per-month-form.html',
  styleUrl: './medical-per-month-form.scss',
})
export class MedicalPerMonthForm implements OnChanges, OnInit {
  @Input() medicalPerMonth?: MedicalPerMonth;
  @Input() organizationList?: Organization[];
  @Input() monthList?: Month[];
  @Input() yearList?: Year[];
  @Input() serviceList?: Service[] | undefined;
  @Output() save: EventEmitter<MedicalPerMonth> =
    new EventEmitter<MedicalPerMonth>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  medical: MedicalPerMonth = { totalMedicalPerMonth: 0 };

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    //this.model = this.medicalPerMonth ? { ...this.medicalPerMonth } : { id:0 , name: '' ,code:0};
  }

  onSubmit(): void {
    this.medical.monthID = this.medical.month?.id;
    this.medical.organizationID = this.medical.organization?.id;
    this.medical.yearID = this.medical.year?.id;
    this.medical.serviceID = this.medical.service?.id;
    this.save.emit(this.medical);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
