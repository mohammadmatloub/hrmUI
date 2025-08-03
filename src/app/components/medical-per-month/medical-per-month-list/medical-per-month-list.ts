import { Component ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { MedicalPerMonth } from '../../../models/medicalPerMonth.model';
@Component({
  selector: 'app-medical-per-month-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, DialogModule],
  templateUrl: './medical-per-month-list.html',
  styleUrl: './medical-per-month-list.scss'
})
export class MedicalPerMonthList  implements OnInit {
  medicalPerMonths: MedicalPerMonth[] = []; // Replace with actual type
  selectedMedicalPerMonth?: MedicalPerMonth; // Replace with actual type
  displayDialog: boolean = false;

  constructor() {}

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
  deleteMedicalPerMonth(record: MedicalPerMonth): void {
    // Logic to delete the record
    this.medicalPerMonths = this.medicalPerMonths.filter(m => m.id !== record.id);
  }

  onSave(record: MedicalPerMonth): void {
    if (record.id) {
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
