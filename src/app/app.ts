import { Component, signal ,OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { MainMenu } from './components/main-menu/main-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabsModule, MainMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

    tabs: { title: string; value: number; content?: string }[] = [];

    
    ngOnInit() {

    }
  protected readonly title = signal('hrmui');
}
