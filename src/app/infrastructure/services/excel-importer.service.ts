import { Injectable } from '@angular/core';

import * as XLSX from 'xlsx';

export interface ImportResult {
  columns: string[];
  data: any[];
}

export interface IFileImporter {
  import(file: File): Promise<ImportResult>;
}

@Injectable({
  providedIn: 'root',
})
export class ExcelImporterService implements IFileImporter {
  /**
   * Reads an Excel file and converts it to structured JSON.
   * @param file The Excel file to import.
   * @returns Promise with extracted column headers and row data.
   */
  import(file: File): Promise<ImportResult> {
    return new Promise<ImportResult>((resolve, reject) => {
      const reader = new FileReader();

      // Use ArrayBuffer for better compatibility than readAsBinaryString
      reader.onload = (e: any) => {
        try {
          const arrayBuffer = e.target.result as ArrayBuffer;
          const wb: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: 'array' });

          const wsName = wb.SheetNames[0];
          const ws = wb.Sheets[wsName];

          // header:1 gives rows as arrays (first row = header row)
          const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[];

          if (!Array.isArray(raw) || raw.length === 0) {
            resolve({ columns: [], data: [] });
            return;
          }

          // raw[0] is the header row (array)
          const originalHeaders = (raw[0] as any[]).map((h) =>
            String(h ?? '').trim()
          );
          const cleanedHeaders = this.cleanHeaders(originalHeaders);

          // slice(1) are the data rows — pass originalHeaders so we can handle object-shaped rows too
          const formatted = this.formatData(
            raw.slice(1),
            cleanedHeaders,
            originalHeaders
          );

          resolve({ columns: cleanedHeaders, data: formatted });
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = (err) => reject(err);

      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Convert raw rows into objects keyed by cleaned headers.
   * rawData rows might be arrays (preferred with header:1) or objects (defensive).
   * originalHeaders helps map object rows correctly when they use original header names.
   */
  private formatData(
    rawData: any[],
    headers: string[],
    originalHeaders: string[]
  ): any[] {
    return rawData.map((row) => {
      // If row is an array — use positions. If it's an object, map using originalHeaders.
      const values: any[] = Array.isArray(row)
        ? row
        : originalHeaders.map((h) => (row && h in row ? row[h] : null));

      const obj: Record<string, any> = {};
      headers.forEach((header, idx) => {
        obj[header] = values[idx] ?? null;
      });
      return obj;
    });
  }

  /** Turn human headers into safe keys (camelCase), e.g. "First Name" -> "firstName" */
  private cleanHeaders(orig: string[]): string[] {
    return orig.map((h) => this.toCamelCase(h));
  }

  /** Convert string to camelCase and remove non-alphanumeric characters */
  private toCamelCase(value: string): string {
    if (!value) return value;
    // remove special chars except spaces, then split
    const parts = value
      .replace(/[^a-zA-Z0-9 ]+/g, '')
      .trim()
      .split(/\s+/);
    const [first, ...rest] = parts;
/*    const camel =
      (first ?? '').toLowerCase() +
      rest.map((w) => this.capitalize(w)).join('');*/
    return  value.replace(/\s+/g, ' ');
  }

  private capitalize(s: string): string {
    return s.length ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;
  }
}
