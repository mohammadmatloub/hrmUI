import { Directive } from '@angular/core';

import {
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ColDef,
  ColumnAutoSizeModule,
  GetRowIdParams,
  GridApi,
  GridOptions,
  LocaleModule,
  ModuleRegistry,
  NumberFilterModule,
  PaginationModule,
  RowSelectionModule,
  ValidationModule,
} from 'ag-grid-community';
import { BehaviorSubject } from 'rxjs';

import { AG_GRID_LOCALE_IR } from './ag-grid-locale';
import {
  CellSelectionModule,
  ClipboardModule,
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  MenuModule,
  RowGroupingModule,
  RowNumbersModule,
  ServerSideRowModelModule,
  SetFilterModule,
  SideBarModule,
  StatusBarModule,
} from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  RowNumbersModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  SetFilterModule,
  NumberFilterModule,
  FiltersToolPanelModule,
  ColumnAutoSizeModule,
  RowSelectionModule,
  CellSelectionModule,
  PaginationModule,
  LocaleModule,
  ClientSideRowModelApiModule,
  ClipboardModule,
  ExcelExportModule,
  MenuModule,
  ServerSideRowModelModule,
  SideBarModule,
  StatusBarModule,
  RowGroupingModule,
]);

@Directive({
  standalone: true,
})
export abstract class BaseList {
  protected columns$: BehaviorSubject<ColDef[]> = new BehaviorSubject<ColDef[]>(
    []
  );

  gridApi!: GridApi;

  gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      sort: 'asc',
      filter: true,
      resizable: true,
    },
    pagination: true,
    paginationPageSize: 10,
    rowSelection: 'single',
    animateRows: true,
    suppressCellFocus: true,
    suppressRowClickSelection: true,
    suppressMovableColumns: true,
    domLayout: 'autoHeight' as const,
    localeText: AG_GRID_LOCALE_IR,
    rowModelType: 'clientSide',
  };

  abstract createColumns(): void;

  abstract onGridReady(param: any): void;

  abstract setDataSource(param?: any): void;

  getRowId(_params: GetRowIdParams): string {
    return '';
  }

  setAllColumnSize(skipHeader?: boolean): void {
    this.gridApi.autoSizeAllColumns(skipHeader);
  }

  setColumnSize(columns: string[], skipHeader?: boolean): void {
    this.gridApi.autoSizeColumns(columns, skipHeader);
  }
}
