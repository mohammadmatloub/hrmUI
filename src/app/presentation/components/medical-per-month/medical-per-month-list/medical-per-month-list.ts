import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';

import { MedicalPerMonthForm } from '../medical-per-month-form/medical-per-month-form';
import { MedicalPerMonthImporter } from '../medical-per-month-importer/medical-per-month-importer';
import { MedicalPerMonth } from '../../../../core/domain/medicalPerMonth.model';
import { Year } from '../../../../core/domain/year.model';
import { Month } from '../../../../core/domain/month.model';
import { Organization } from '../../../../core/domain/organization.model';
import { Service } from '../../../../core/domain/service.model';
import { Occupation } from '../../../../core/domain/occupation.model';
import { MedicalPerMonthService } from '../../../../infrastructure/services/medical-Per-Month.service';
import { YearService } from '../../../../infrastructure/services/year.service';
import { MonthService } from '../../../../infrastructure/services/month.service';
import { OrganizationService } from '../../../../infrastructure/services/organization.service';
import { ServiceService } from '../../../../infrastructure/services/service.service';

@Component({
  selector: 'app-medical-per-month-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    MedicalPerMonthForm,
    MedicalPerMonthImporter,
  ],
  templateUrl: './medical-per-month-list.html',
  styleUrl: './medical-per-month-list.scss',
})
export class MedicalPerMonthList implements OnInit {
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

  constructor(
    private medicalPerMonthService: MedicalPerMonthService,
    private yearService: YearService,
    private monthService: MonthService,
    private organizationService: OrganizationService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.loadMedicalPerMonth();
    this.organizationService
      .getAll()
      .subscribe((organizations: Organization[]): void => {
        this.organizationList = organizations;
      });
    this.serviceService.getAll().subscribe((services: Service[]): void => {
      this.serviceList = services;
    });
    this.yearService.getAll().subscribe((years: Year[]): void => {
      this.yearList = years;
    });
    this.monthService.getAll().subscribe((months: Month[]): void => {
      this.monthList = months;
    });
  }

  loadMedicalPerMonth(): void {
    this.medicalPerMonthService
      .getAll()
      .subscribe((medicalPerMonth: MedicalPerMonth[]): void => {
        this.medicalPerMonths = medicalPerMonth;
      });
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

  detailMedicalPerMonth(record: MedicalPerMonth): void {
    this.selectedMedicalPerMonth = { ...record };
    this.createDialog = true;
  }

  deleteMedicalPerMonth(medicalPerMonth: MedicalPerMonth): void {
    // Logic to delete the record
    this.medicalPerMonths = this.medicalPerMonths.filter(
      (m: MedicalPerMonth): boolean => m.id !== medicalPerMonth.id
    );
  }

  createMedicalPerMonth(medicalPerMonth: MedicalPerMonth): void {
    if (medicalPerMonth.id) {
      // Update existing record logic
    } else {
      this.medicalPerMonthService.create(medicalPerMonth).subscribe();
    }

    this.createDialog = false;
    this.loadMedicalPerMonth();
  }

  onCancel(): void {
    this.createDialog = false;
    this.importerDialog = false;
  }

  importerMedicalPerMonth(): void {
    this.importerDialog = true;
  }

  createMedicalPerMonthList(medicalPerMonthList: MedicalPerMonth[]): void {
    for (let medicalPerMonth of medicalPerMonthList) {
      this.medicalPerMonthService.create(medicalPerMonth).subscribe();
    }
    this.importerDialog =false;
    this.loadMedicalPerMonth();
  }
}
