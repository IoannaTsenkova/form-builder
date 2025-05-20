import { Box, TextField, MenuItem, Typography } from '@mui/material';
import type { FormSchema } from '../types/form-schema';

interface Props {
  schema: FormSchema;
}

export default function FormRenderer({ schema }: Props) {
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {schema.title}
      </Typography>
      {schema.fields.map((field) => {
        switch (field.type) {
          case 'text':
            return (
              <TextField key={field.name} label={field.label} fullWidth margin="normal" />
            );
          case 'textarea':
            return (
              <TextField
                key={field.name}
                label={field.label}
                fullWidth
                multiline
                minRows={3}
                margin="normal"
              />
            );
          case 'dropdown':
            return (
              <TextField
                key={field.name}
                label={field.label}
                select
                fullWidth
                margin="normal"
              >
                {'options' in field && field?.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            );
          default:
            return null;
        }
      })}
    </Box>
  );
}
