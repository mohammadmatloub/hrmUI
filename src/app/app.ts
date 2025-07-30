import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepartmentList } from './components/department/department-list/department-list';
import { PersonnelAttendanceList } from './components/personnel-attendance/personnel-attendance-list/personnel-attendance-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PersonnelAttendanceList],
  template: `<app-personnel-attendance-list></app-personnel-attendance-list>`,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('hrmui');
}
