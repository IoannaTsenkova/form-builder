import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { BaseField } from '../../types/form-types';
import { getFieldError } from '../../utils/helpers';

interface Props {
  field: BaseField;
  name: string;
}

export default function CheckboxFieldRenderer({ field, name }: Props) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const errorMessage = getFieldError(errors, name);

  return (
    <>
      <FormControlLabel
        key={field.name}
        control={<Checkbox {...register(field.name)} />}
        label={field.label}
        sx={{ mt: 1 }}
      />
      {!!errorMessage && (
        <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
}
