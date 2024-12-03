// types/column.ts
export interface Column {
  label: string;
  key: string;
  render?: (row: any) => string | number;
  isDropdown?: boolean;
  dropdownOptions?: { label: string; action: (row: any) => void }[];
}
