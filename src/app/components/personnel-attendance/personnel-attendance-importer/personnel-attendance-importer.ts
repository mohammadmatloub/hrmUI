import { Component } from '@angular/core';
// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast'; // For messages
import { MessageService } from 'primeng/api'; // For messages
import { FileSelectEvent } from 'primeng/fileupload';
import { ExcelImporterService, ImportResult } from '../../../services/excel-importer.service';



@Component({
  selector: 'app-personnel-attendance-importer',
  imports: [TableModule, FileUploadModule,ToastModule ],
  templateUrl: './personnel-attendance-importer.html',
  standalone : true,
  providers:[MessageService],
  styleUrl: './personnel-attendance-importer.scss'
})
export class PersonnelAttendanceImporter {
 importedData: any[] = [];
  tableColumns: string[] = [];

  constructor(
    private messageService: MessageService,
    private excelImporter: ExcelImporterService
  ) {}

  /** Handles file selection event from file upload UI */
  async onFileSelect(event: FileSelectEvent): Promise<void> {
    const file = event.files[0];

    if (!file) {
      this.showMessage('warn', 'No File Selected', 'Please choose an Excel file.');
      return;
    }

    this.showMessage('info', 'File Selected', file.name);

    try {
      const result: ImportResult = await this.excelImporter.import(file);
      if (result.data.length === 0) {
        this.showMessage('warn', 'Empty File', 'The selected Excel file is empty.');
        this.clearData();
        return;
      }

      this.tableColumns = result.columns;
      this.importedData = result.data;
      this.showMessage('success', 'File Processed', 'Excel data loaded successfully.');
    } catch (error) {
      console.error('File reading error:', error);
      this.showMessage('error', 'File Error', 'Could not read the file.');
    }
  }

  /** Clears the imported data */
  onFileClear(): void {
    this.clearData();
    this.showMessage('info', 'File Cleared', 'Imported data reset.');
  }

  /** Displays a message using PrimeNG's MessageService */
  private showMessage(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  /** Resets table data and columns */
  private clearData(): void {
    this.importedData = [];
    this.tableColumns = [];
  }
}
