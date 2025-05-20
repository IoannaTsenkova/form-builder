export type FieldType =
  | 'text'
  | 'textarea'
  | 'dropdown'
  | 'checkbox'
  | 'radio';

export interface BaseField {
  type: FieldType;
  label: string;
  name: string;
  rules? : string[];
}

export interface DropdownField extends BaseField {
  type: 'dropdown';
  options: string[];
}

export type FormField = BaseField | DropdownField;

export interface FormSchema {
  title: string;
  fields: FormField[];
}
