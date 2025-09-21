import { Component, signal, OnInit, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TabsModule } from 'primeng/tabs';

import { MainMenu } from './presentation/components/main-menu/main-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabsModule, MainMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  tabs: { title: string; value: number; content?: string }[] = [];

  ngOnInit(): void {}

  protected readonly title: WritableSignal<string> = signal('hrmui');
}
