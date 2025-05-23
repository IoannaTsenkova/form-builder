import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import type { BaseField } from '../../types/form-types';
import { getFieldError } from '../../utils/helpers';

interface Props {
  field: BaseField;
  name: string;
}

export default function RadioFieldRenderer({ field, name }: Props) {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const errorMessage = getFieldError(errors, name);

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
                        {'options' in field && Array.isArray((field as any).options) &&
                          (field as { options: string[] }).options.map((opt) => (
                            <FormControlLabel
                              key={opt}
                              value={opt}
                              control={<Radio />}
                              label={opt}
                            />
                          ))}
                      </RadioGroup>
                      {!!errorMessage && (
                        <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>
                          {errorMessage}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Box>
  );
}
