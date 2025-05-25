import { z } from 'zod';
import type { FormField } from '../types/form-types';

export function generateZodSchema(fields: FormField[]): z.ZodObject<any> {
  const shape: Record<string, z.ZodTypeAny> = {};
  fields?.forEach((field) => {
    if (field.type === 'group') {
      if ('fields' in field && Array.isArray(field.fields)) {
        const nestedSchema = generateZodSchema(field.fields);
        shape[field.name] = nestedSchema;
      } else {
        console.warn(`Group field "${field.name}" is missing 'fields' property.`);
      }
      return;
    }

    let validator: z.ZodTypeAny;

    switch (field.type) {
      case 'text':
      case 'textarea': {
        validator = z.string();

        if (field.validation?.minLength) {
          validator = (validator as z.ZodString).min(
            field.validation.minLength,
            `${field.label} must be at least ${field.validation.minLength} characters`
          );
        }

        if (field.validation?.maxLength) {
          validator = (validator as z.ZodString).max(
            field.validation.maxLength,
            `${field.label} must be at most ${field.validation.maxLength} characters`
          );
        }

        if (field.validation?.pattern) {
          try {
            const regex = new RegExp(field.validation.pattern);
            validator = (validator as z.ZodString).regex(regex, `${field.label} is invalid`);
          } catch {
            console.warn(`Invalid regex for ${field.name}`);
          }
        }

        if (field.required) {
          validator = (validator as z.ZodString).min(1, `${field.label} is required`);
        } else {
          validator = validator.optional();
        }

        break;
      }

      case 'dropdown':
      case 'radio': {
        validator = z.string();
        if (field.required) {
          validator = (validator as z.ZodString).min(1, `${field.label} is required`);
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
