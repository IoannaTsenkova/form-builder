import { z } from 'zod';
import type { FormField } from '../types/form-types';

export function generateZodSchema(fields: FormField[]) {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    let validator;

    switch (field.type) {
      case 'text':
      case 'textarea': {
        validator = z.string();
        if (field.validation?.minLength) {
          validator = validator.min(
            field.validation.minLength,
            `${field.label} must be at least ${field.validation.minLength} characters`
          );
        }
        if (field.validation?.maxLength) {
          validator = validator.max(
            field.validation.maxLength,
            `${field.label} must be at most ${field.validation.maxLength} characters`
          );
        }
        if (field.validation?.pattern) {
          validator = validator.regex(
            new RegExp(field.validation.pattern),
            `${field.label} is invalid`
          );
        }
        if (!field.required) {
          validator = validator.optional();
        } else {
          validator = validator.min(1, `${field.label} is required`);
        }
        break;
      }
      case 'dropdown':
      case 'radio': {
        validator = z.string();

        if (field.required) {
          validator = validator.min(1, `${field.label} is required`);
        } else {
          validator = validator.optional();
        }
        break;
      }
      case 'checkbox': {
        validator = z.boolean();
        if (field.required) {
          validator = validator.refine((val) => val === true, {
            message: `${field.label} must be accepted`
          });
        } else {
          validator = validator.optional();
        }
        break;
      }

      default:
        validator = z.any();
    }
    shape[field.name] = validator;
  });

  return z.object(shape);
}
