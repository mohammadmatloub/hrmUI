import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { Panel } from 'primeng/panel';
import { Select } from 'primeng/select';

import { MedicalPerMonthMaster,MedicalPerMonthDetail } from '../../../../core/domain/medicalPerMonth.model';
import { Organization } from '../../../../core/domain/organization.model';
import { Month } from '../../../../core/domain/month.model';
import { Year } from '../../../../core/domain/year.model';
import { Service } from '../../../../core/domain/service.model';
import {TableModule} from 'primeng/table';
import {ServiceList} from '../../service/service-list/service-list';

@Component({
  selector: 'app-medical-per-month-form',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    Panel,
    Select,
    TableModule
  ],
  templateUrl: './medical-per-month-form.html',
  styleUrl: './medical-per-month-form.scss',
})
export class MedicalPerMonthForm implements OnChanges, OnInit {
  @Input() medicalPerMonth?: MedicalPerMonthMaster;
  @Input() organizationList?: Organization[];
  @Input() monthList?: Month[];
  @Input() yearList?: Year[];
  @Input() serviceList?: Service[] | undefined;
  @Output() save: EventEmitter<MedicalPerMonthMaster> =
    new EventEmitter<MedicalPerMonthMaster>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();



  medical: MedicalPerMonthMaster = {};
  detailsList: MedicalPerMonthDetail[] = [];
  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['serviceList']) {
      this.serviceList?.forEach( service => {
        let medicalPerMonthDetail: MedicalPerMonthDetail = {master:this.medical,service:service,serviceID:service.id,totalMedicalPerMonth:0};
        this.detailsList.push(medicalPerMonthDetail);
      })
    }
  }

  onSubmit(): void {
    this.medical.monthID = this.medical.month?.id;
    this.medical.organizationID = this.medical.organization?.id;
    this.medical.yearID = this.medical.year?.id;
    this.medical.medicalPerMonthDetails = this.detailsList;
    this.save.emit(this.medical);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
