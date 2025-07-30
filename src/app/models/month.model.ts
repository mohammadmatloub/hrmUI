export interface Month {
  id?: number;         // from PanacheEntity
  monthNumber: number; // your int id field renamed
  code: number;
  name: string;
}