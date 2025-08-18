import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MedicalPerMonth} from '../../../models/medicalPerMonth.model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputNumber} from 'primeng/inputnumber';
import {Panel} from 'primeng/panel';
import {Select} from 'primeng/select';
import {Year} from '../../../models/year.model';
import {Month} from '../../../models/month.model';
import {Organization} from '../../../models/organization.model';
import {Department} from '../../../models/department.model';
import {Occupation} from '../../../models/occupation.model';
import {Service} from '../../../models/service.model';
import {YearService} from '../../../services/year.service';
import {MonthService} from '../../../services/month.service';
import {OrganizationService} from '../../../services/organization.service';
import {ServiceService} from '../../../services/service.service';


@Component({
  selector: 'app-medical-per-month-form',
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, InputNumber, Panel, Select],
  templateUrl: './medical-per-month-form.html',
  styleUrl: './medical-per-month-form.scss'
})
export class MedicalPerMonthForm implements OnChanges , OnInit {
  @Input() medicalPerMonth?: MedicalPerMonth;
  @Input() organizationList?: Organization[];
  @Input() monthList?: Month[];
  @Input() yearList?: Year[];
  @Input() serviceList?: Service[] | undefined;
  @Output() save = new EventEmitter<MedicalPerMonth>();
  @Output() cancel = new EventEmitter<void>();



  medical: MedicalPerMonth = {id: 0, organizationId:0,monthId: 0, yearId: 0, serviceId: 0, totalMedicalPerMonth: 0}

  constructor( ) {
  }
  ngOnInit() {

  }

  ngOnChanges() {
    //this.model = this.medicalPerMonth ? { ...this.medicalPerMonth } : { id:0 , name: '' ,code:0};
  }

  onSubmit() {
    this.save.emit(this.medical);
  }

  onCancel() {
    this.cancel.emit();
  }
}
