import { MenuItem, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { BaseField } from '../../types/form-types';
import { getFieldError } from '../../utils/helpers';

interface Props {
  field: BaseField;
  name: string;
}

export default function DropdownFieldRenderer({ field, name }: Props) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const errorMessage = getFieldError(errors, name);

  return (
    <TextField
      key={field.name}
      label={field.label}
      {...register(field.name)}
      select
      fullWidth
      margin="normal"
      sx={{ mb: 2 }}
      error={!!errorMessage}
      helperText={errorMessage}
    >
      {'options' in field && Array.isArray((field as any).options) &&
        (field as { options: string[] }).options.map((option: string) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
    </TextField>
  );
}
