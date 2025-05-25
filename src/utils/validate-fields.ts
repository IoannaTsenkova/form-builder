import type z from 'zod';
import { findFieldConfig } from './helpers';
import type { FormField } from '@/types/form-types';
import type { UseFormSetError } from 'react-hook-form';

export function validateFormData(
  formData: any,
  schema: z.ZodObject<any>,
  fields: FormField[],
  setError: UseFormSetError<any>
) {
  const result = schema.safeParse(formData);

  if (!result.success) {
    return result.error.errors;
  }

  const errors: string[] = [];
  for (const fieldName in formData) {
    const field = formData[fieldName];

    const fieldConfig = findFieldConfig(fieldName, fields);
    if (fieldConfig && fieldConfig.validation?.rules?.dependsOn) {
      const dependsOnField = fieldConfig.validation.rules.dependsOn;
      const dependencyValue = formData[dependsOnField];
      if (fieldConfig.validation?.rules?.dependencies) {
        const dependencyPattern = fieldConfig.validation.rules.dependencies[dependencyValue];

        if (dependencyPattern && !new RegExp(dependencyPattern).test(field)) {
          setError(fieldName, {
            type: 'manual',
            message: `The ${fieldConfig.label} field does not match the pattern for ${dependsOnField}`
          });
          errors.push(
            `The ${fieldConfig.label} field does not match the pattern for ${dependsOnField}`
          );
        }
      }
    }
  }

  return errors.length ? errors : null;
}
