import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { PersonnelAttendance } from '../../../models/personnelAttendance.model';
import { PersonnelAttendanceService } from '../../../services/personnel-attendance.service';
import { PersonnelAttendanceForm } from '../personnel-attendance-form/personnel-attendance-form';
@Component({
  selector: 'app-personnel-attendance-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, DialogModule,PersonnelAttendanceForm],
  templateUrl: './personnel-attendance-list.html',
  styleUrl: './personnel-attendance-list.scss'
})
export class PersonnelAttendanceList implements OnInit {
  // Define properties and methods for the component here
  // For example, you might want to fetch attendance data from a service
  personnelAttendances: PersonnelAttendance[] = [];
  selectedAttendance?: PersonnelAttendance;
  displayDialog: boolean = false;
  isEditing: boolean = false;

  constructor(private personnelAttendanceService: PersonnelAttendanceService) {}

  ngOnInit(): void {
    // Initialization logic, such as fetching data
    this.loadPersonnelAttendances();
  }
  loadPersonnelAttendances(): void {
    this.personnelAttendanceService.getAll().subscribe(attendances => {
      this.personnelAttendances = attendances;
    });
  }
  // Add methods to handle attendance data, such as fetching, displaying, and managing attendance records

  addPersonnelAttendance(): void {
    this.selectedAttendance = undefined;
    this.isEditing = false;
    this.displayDialog = true;
  }

  createAttendance(attendance: PersonnelAttendance): void {
      // Create new attendance
      console.log("HI Create")
    this.personnelAttendanceService.create(attendance).subscribe(() => {
      this.loadPersonnelAttendances();
      this.closeDialog();
    });
  }

  closeDialog(): void {
    this.displayDialog = false;
  }
}
