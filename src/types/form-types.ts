export type FieldType = 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'radio' | 'group';

export interface BaseField {
  type: FieldType;
  label: string;
  name: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    rules?: {
      dependsOn: string;
      dependencies: Record<string, string>;
      message?: string;	
    };
  };
  autofillFromApi?: boolean;
  autofillCondition?: Record<string, string>;
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

export interface GroupField extends BaseField {
  type: 'group';
  fields: FormField[];
  visibleIf?: Record<string, string>;
}

export type FormField = BaseField | DropdownField | RadioField | CheckboxField | GroupField;

export interface IForm {
  title: string;
  fields: FormField[];
}
