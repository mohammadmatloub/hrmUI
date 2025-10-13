export interface IActionCellModel {
  label?: string;
  icon?: string;
  iconPos?: 'bottom' | 'top' | 'right';
  class?: string;
  variant?: string;
  severity?:
    | 'secondary'
    | 'success'
    | 'contrast'
    | 'danger'
    | 'help'
    | 'warn'
    | 'info';
  click?: (event: any) => void;
  disable?: boolean;
  rounded?: boolean;
  text?: boolean;
}
