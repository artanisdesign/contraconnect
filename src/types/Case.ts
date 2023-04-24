export interface CaseTemplate {
  id: string;
  title: string;
  documentsCount: number;
  status: "draft" | "inProgress" | "completed";
  createdAt: string | number;
  updatedAt: string | number;
  documentsDetails: DocumentDetails[];
  fieldSections: FieldSection[];
}
export interface DocumentDetails {
  url: string;
  title: string;
}
export interface FieldSection {
  id: string;
  title: string;
  type?: "person" | "flat" | "company" ;
  fields: Field[];
  fullWidth?: boolean;
  visibleState?: string[];
  visibleCondition?: string;
}

export interface Field {
  id: string;
  title: string;
  fieldType:
    | "text"
    | "email"
    | "number"
    | "date"
    | "select"
    | "radiogroup"
    | "checkbox";
  mandatory?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  endDecorator?: string;
  startDecorator?: string;
  options?: string[] | RadioOption[] | SelectOption[];
  generate?: (value: string) => string;
  toField?: string;
  setRef?: boolean;
  defaultValue?: string;
  helperText?: string;
  visibleState?: string[];
  visibleCondition?: string;
  resetOnChange?: boolean;
}

export interface RadioOption {
  value: string;
  label: string;
}
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

