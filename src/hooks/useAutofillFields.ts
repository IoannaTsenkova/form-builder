// src/hooks/useAutofillFields.ts
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { FormField } from '../types/form-types';

export function useAutofillFields(schemaFields: FormField[]) {
  const { control, setValue } = useFormContext();
  const [lockedFields, setLockedFields] = useState<Set<string>>(new Set());
  const updated = new Set<string>();
  const autofillFields = schemaFields.filter((f) => f.autofillFromApi && f.autofillCondition);
  const watchedKeys = Array.from(
    new Set(autofillFields.flatMap((f) => Object.keys(f.autofillCondition!)))
  );
  const watchedValues = useWatch({ control, name: watchedKeys });

  useEffect(() => {
    const currentValues = watchedKeys.reduce(
      (acc, key, idx) => {
        acc[key] = watchedValues?.[idx];
        return acc;
      },
      {} as Record<string, any>
    );

    autofillFields.forEach((field) => {
      const conditions = field.autofillCondition!;
      const allMatch = Object.entries(conditions).every(
        ([key, expected]) => currentValues[key] === expected
      );

      if (allMatch) {
        updated.add(field.name);

        setValue(field.name, (curr: any) => {
          const val = curr[field.name];
          return val === undefined || val === ''
            ? fetch('/api/autofill')
                .then((res) => res.json())
                .then((data) => {
                  if (data[field.name]) {
                    setValue(field.name, data[field.name]);
                  }
                })
                .catch((err) => {
                  console.error('Auto-fill error:', err);
                })
            : val;
        });
      } else {
        setValue(field.name, '');
      }
    });

    setLockedFields(updated);
  }, [JSON.stringify(watchedValues)]);

  return lockedFields;
}
