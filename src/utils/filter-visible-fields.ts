import type { FormField } from '../types/form-types';

type FormValues = Record<string, any>;

export function filterVisibleFields(
  values: FormValues,
  fields: FormField[],
  context: FormValues
): FormValues {
  const result: FormValues = {};
  console.log(fields);
  
  if (!Array.isArray(fields)) {
    console.error('Invalid fields data, expected an array', fields);
    return [];
  }

  for (const field of fields) {
    let isVisible = true;

    if ('visibleIf' in field && field.visibleIf) {
      const [depName, expected] = Object.entries(field.visibleIf)[0];
      isVisible = context[depName] === expected;
    }

    if (!isVisible) continue;

    if (field.type === 'group' && 'fields' in field && Array.isArray(field.fields)) {
      const groupValues = values[field.name] || {};
      const nested = filterVisibleFields(groupValues, field.fields, context[field.name] || {});
      if (Object.keys(nested).length > 0) {
        result[field.name] = nested;
      }
    } else {
      if (values[field.name] !== undefined) {
        result[field.name] = values[field.name];
      }
    }
  }

  return result;
}
