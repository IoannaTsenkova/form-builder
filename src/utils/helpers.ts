import type { FormField } from "@/types/form-types";

export function getFieldError(errors: any, name: string): string | undefined {
  return name.split('.').reduce((obj, key) => obj?.[key], errors)?.message;
}

export function findFieldConfig(fieldName: string, fields: FormField[]): FormField | undefined {
  return fields.find(field => field.name === fieldName);
}

