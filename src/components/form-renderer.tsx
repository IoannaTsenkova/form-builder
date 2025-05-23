import { Box, Typography, Button } from '@mui/material';
import type { IForm } from '../types/form-types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateZodSchema } from '../utils/generate-zod-schema';
import FieldRenderer from './field-renderer';
import { filterVisibleFields } from '../utils/filter-visible-fields';

interface Props {
  jsonForm: IForm;
}

export default function FormRenderer({ jsonForm }: Props) {
  const formSchema = generateZodSchema(jsonForm.fields);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const { handleSubmit } = form;

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
