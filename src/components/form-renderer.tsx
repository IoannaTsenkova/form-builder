import {
  Box,
  TextField,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Button
} from '@mui/material';
import type { FormSchema } from '../types/form-schema';
import { useForm } from 'react-hook-form';

interface Props {
  schema: FormSchema;
}

export default function FormRenderer({ schema }: Props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form output:', data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: '600px',
        mx: 'auto',
        mt: 4,
        p: 4
        // backgroundColor: 'white',
        // borderRadius: 3,
        // boxShadow: 3
      }}
    >
      <Typography variant="h5" mb={3} color="primary">
        {schema.title}
      </Typography>
      {schema.fields.map((field) => {
        switch (field.type) {
          case 'text':
            return (
              <TextField
                key={field.name}
                label={field.label}
                {...register(field.name)}
                fullWidth
                margin="normal"
                sx={{ mb: 2 }}
              />
            );
          case 'textarea':
            return (
              <TextField
                key={field.name}
                label={field.label}
                {...register(field.name)}
                fullWidth
                multiline
                minRows={3}
                margin="normal"
                sx={{ mb: 2 }}
              />
            );
          case 'dropdown':
            return (
              <TextField
                key={field.name}
                label={field.label}
                {...register(field.name)}
                select
                fullWidth
                margin="normal"
                sx={{ mb: 2 }}
              >
                {'options' in field &&
                  field?.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </TextField>
            );
          case 'checkbox':
            return (
              <FormControlLabel
                key={field.name}
                control={<Checkbox {...register(field.name)} />}
                label={field.label}
                sx={{ mt: 1 }}
              />
            );
          case 'radio':
            return (
              <Box key={field.name} mb={2}>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, mb: 1 }}>
                  {field.label}
                </Typography>
                <RadioGroup row {...register(field.name)}>
                  {'options' in field &&
                    field.options.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                </RadioGroup>
              </Box>
            );
          default:
            return null;
        }
      })}
      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
