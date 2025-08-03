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
@Component({
  selector: 'app-medical-per-month-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, DialogModule, MedicalPerMonthForm],
  templateUrl: './medical-per-month-list.html',
  styleUrl: './medical-per-month-list.scss'
})
export class MedicalPerMonthList  implements OnInit {
  medicalPerMonths: MedicalPerMonth[] = []; // Replace with actual type
  selectedMedicalPerMonth?: MedicalPerMonth; // Replace with actual type
  displayDialog: boolean = false;
  isEditing: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.loadMedicalPerMonth();
  }

  loadMedicalPerMonth(): void {
    // Load medical records from a service or API
    // this.medicalRecords = fetchedData;
  }

  addMedicalPerMonth(): void {

    this.displayDialog = true;
  }

  editMedicalPerMonth(record: MedicalPerMonth): void {
    this.selectedMedicalPerMonth = { ...record };
    this.displayDialog = true;
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
    this.displayDialog = false;
    this.loadMedicalPerMonth();
  }

  onCancel(): void {
    this.displayDialog = false;
  }

}
