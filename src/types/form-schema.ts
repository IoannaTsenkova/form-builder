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

export interface RadioField extends BaseField {
  type: 'radio';
  options: string[];
}

export interface CheckboxField extends BaseField {
  type: 'checkbox';
}

export type FormField = BaseField | DropdownField | RadioField | CheckboxField;

export interface FormSchema {
  title: string;
  fields: FormField[];
}
