import { ChangeDetectionStrategy, Component } from '@angular/core';

import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';
import { IActionCellModel } from './models/actions-cell-renderer.model';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  templateUrl: './actions-cell-renderer.component.html',
  styleUrl: './actions-cell-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, NgClass],
})
export class ActionsCellRenderer implements ICellRendererAngularComp {
  protected actions: IActionCellModel[] = [];

  agInit(params: ICellRendererParams & { actions: IActionCellModel[] }): void {
    this.actions = params.actions;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
}
