import { Component ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-medical-per-month-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, DialogModule],
  templateUrl: './medical-per-month-list.html',
  styleUrl: './medical-per-month-list.scss'
})
export class MedicalPerMonthList {

}
