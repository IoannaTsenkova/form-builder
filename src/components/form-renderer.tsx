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
import type { IForm } from '../types/form-types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateZodSchema } from '../utils/generate-zod-schema';

interface Props {
  jsonForm: IForm;
}

export default function FormRenderer({ jsonForm }: Props) {
  const formSchema = generateZodSchema(jsonForm.fields);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = form;

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
      }}
    >
      <Typography variant="h5" mb={3} color="primary">
        {jsonForm.title}
      </Typography>
      {jsonForm.fields.map((field) => {
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
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message as string}
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
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message as string}
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
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message as string}
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
              <>
                <FormControlLabel
                  key={field.name}
                  control={<Checkbox {...register(field.name)} />}
                  label={field.label}
                  sx={{ mt: 1 }}
                />
                {errors[field.name] && (
                  <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>
                    {errors[field.name]?.message as string}
                  </Typography>
                )}
              </>
            );
          case 'radio':
            return (
              <Box key={field.name} mb={2}>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, mb: 1 }}>
                  {field.label}
                </Typography>
                <Controller
                  name={field.name}
                  control={control}
                  defaultValue=""
                  render={({ field: controllerField }) => (
                    <>
                      <RadioGroup row {...controllerField}>
                        {'options' in field && field.options.map((opt) => (
                          <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                        ))}
                      </RadioGroup>
                      {errors[field.name] && (
                        <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>
                          {errors[field.name]?.message as string}
                        </Typography>
                      )}
                    </>
                  )}
                />
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
