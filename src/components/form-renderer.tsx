import { Box, Typography, Button } from '@mui/material';
import type { IForm } from '../types/form-types';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateZodSchema } from '../utils/generate-zod-schema';
import FieldRenderer from './field-renderer';
import { filterVisibleFields } from '../utils/filter-visible-fields';
import { useEffect } from 'react';

interface Props {
  jsonForm: IForm;
}

export default function FormRenderer({ jsonForm }: Props) {
  const formSchema = generateZodSchema(jsonForm.fields);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const { handleSubmit, setValue, control } = form;

const autofillFields = jsonForm.fields.filter(
  (f) => f.autofillFromApi && f.autofillCondition
);

const watchedKeys = autofillFields.flatMap((f) => Object.keys(f.autofillCondition ?? {}));
const watchedValues = useWatch({ control, name: watchedKeys });

useEffect(() => {
  const shouldAutofill = autofillFields.every((field) => {
    const [condKey, condValue] = Object.entries(field.autofillCondition!)[0];
    const currentValue = watchedValues[Number(condKey)] || watchedValues?.[watchedKeys.indexOf(condKey)];
    return currentValue === condValue;
  });

  if (!shouldAutofill) return;

  fetch('/api/autofill')
    .then((res) => res.json())
    .then((data) => {
      jsonForm.fields.forEach((field) => {
        if (field.autofillFromApi && data[field.name]) {
          setValue(field.name, data[field.name]);
        }
      });
    });
}, [watchedValues.join('|')]);

  const onSubmit = (values: any) => {
    const filtered = filterVisibleFields(values, jsonForm.fields, values);
    console.log('Cleaned form values:', filtered);
  };

  return (
    <FormProvider {...form}>
      <Box
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: '600px',
          mx: 'auto',
          mt: 4,
          p: 4
        }}
      >
        <Typography variant="h5" mb={3} color="primary">
          {jsonForm.title}
        </Typography>
        {jsonForm.fields.map((field) => (
          <FieldRenderer key={field.name} field={field} parentName="" />
        ))}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
}
