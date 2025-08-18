import { Component ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { MedicalPerMonth } from '../../../models/medicalPerMonth.model';
import {DepartmentForm} from '../../department/department-form/department-form';
import {MedicalPerMonthForm} from '../medical-per-month-form/medical-per-month-form';
import {YearService} from '../../../services/year.service';
import {MonthService} from '../../../services/month.service';
import {OrganizationService} from '../../../services/organization.service';
import {DepartmentService} from '../../../services/department.service';
import {OccupationService} from '../../../services/occupation.service';
import {ServiceService} from '../../../services/service.service';
import { MedicalPerMonthImporter } from "../medical-per-month-importer/medical-per-month-importer";
import { Year } from '../../../models/year.model';

import { Organization } from '../../../models/organization.model';
import { Service } from '../../../models/service.model';
import { Occupation } from '../../../models/occupation.model';
import { Month } from '../../../models/month.model';
@Component({
  selector: 'app-medical-per-month-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, DialogModule, MedicalPerMonthForm, MedicalPerMonthImporter],
  templateUrl: './medical-per-month-list.html',
  styleUrl: './medical-per-month-list.scss'
})
export class MedicalPerMonthList  implements OnInit {
  medicalPerMonths: MedicalPerMonth[] = []; // Replace with actual type
  selectedMedicalPerMonth?: MedicalPerMonth; // Replace with actual type
  createDialog: boolean = false;
  importerDialog: boolean = false;
  isEditing: boolean = false;
  yearList: Year[] = [];
  monthList: Month[] = [];
  organizationList: Organization[] = [];
  serviceList: Service[] = [];
  occupationList: Occupation[] = [];

  constructor( private yearService :YearService,
                  private monthService :MonthService,
                  private organizationService :OrganizationService,
                  private serviceService:ServiceService) {
  }

  ngOnInit(): void {
    this.loadMedicalPerMonth();
        this.organizationService.getAll().subscribe(organizations=>{
      this.organizationList = organizations;});
    this.serviceService.getAll().subscribe(services => {
      this.serviceList = services; });
    this.yearService.getAll().subscribe(years=>{
      this.yearList = years;});
    this.monthService.getAll().subscribe(months=>{
      this.monthList = months;});
  }

  loadMedicalPerMonth(): void {
    // Load medical records from a service or API
    // this.medicalRecords = fetchedData;
  }

  addMedicalPerMonth(): void {

    this.createDialog = true;
  }

  editMedicalPerMonth(record: MedicalPerMonth): void {
    this.selectedMedicalPerMonth = { ...record };
    this.createDialog = true;
  }
  deleteMedicalPerMonth(medicalPerMonth: MedicalPerMonth): void {
    // Logic to delete the record
    this.medicalPerMonths = this.medicalPerMonths.filter(m => m.id !== medicalPerMonth.id);
  }

  createMedicalPerMonth(medicalPerMonth: MedicalPerMonth): void {
    if (medicalPerMonth.id) {
      // Update existing record logic
    } else {
      // Create new record logic
    }
    this.createDialog = false;
    this.loadMedicalPerMonth();
  }

  onCancel(): void {
    this.createDialog = false;
  }

  
  importerMedicalPerMonth(): void {

    this.importerDialog = true;
  }

}
