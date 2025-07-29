import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepartmentList } from './components/department/department-list/department-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DepartmentList],
  template: `<app-department-list></app-department-list>`,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('hrmui');
}
