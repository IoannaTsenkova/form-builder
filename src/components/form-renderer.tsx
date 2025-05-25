import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import type { IForm } from '../types/form-types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateZodSchema } from '../utils/generate-zod-schema';
import FieldRenderer from './field-renderer';
import { filterVisibleFields } from '../utils/filter-visible-fields';
import { useAutofillFields } from '../hooks/useAutofillFields';
import { useEffect, useState } from 'react';
import { validateFormData } from '../utils/validate-fields';

interface Props {
  jsonForm: IForm;
  defaultValues?: any;
}

export default function FormRenderer({ jsonForm, defaultValues }: Props) {
  const [output, setOutput] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formSchema = generateZodSchema(jsonForm.fields);
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: defaultValues || {}
  });
  const { handleSubmit, setError } = form;

  useEffect(() => {
    !!defaultValues && form.reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = (values: any) => {
    const filtered = filterVisibleFields(values, jsonForm.fields, values);
    const errors = validateFormData(filtered, formSchema, jsonForm.fields, setError);
    if(!!errors?.length) {
      return;
    }
    setOutput(filtered);
    setIsDialogOpen(true);
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
        <FormWithAutofill jsonForm={jsonForm} />
        <Box mt={3}>
          {!!jsonForm.fields && 
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Submit
          </Button>
          }
        </Box>
      </Box>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle color="secondary">Form Submission Output</DialogTitle>
        <DialogContent dividers>
          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: 4 }}>
            {JSON.stringify(output, null, 2)}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}

function FormWithAutofill({ jsonForm }: Props) {
  const filledFields = useAutofillFields(jsonForm.fields || []);

  return (
    <>
      <Typography variant="h5" mb={3} color="secondary">
        {jsonForm.title}
      </Typography>
      {!!jsonForm.fields && jsonForm?.fields.map((field) => (
        <FieldRenderer key={field.name} field={field} parentName="" filledFields={filledFields} />
      ))}
    </>
  );
}
