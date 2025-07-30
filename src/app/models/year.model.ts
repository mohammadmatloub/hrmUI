export interface Year {
  id?: number;    // PanacheEntity provides 'id' implicitly
  code: number;   // 'Long' mapped as 'number'
  name: string;
}