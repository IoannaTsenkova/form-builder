import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import type { BaseField } from '../../types/form-types';

interface Props {
  field: BaseField;
  name: string;
  filledFields: Set<string>;
}

export default function TextFieldRenderer({ field, name, filledFields }: Props) {
  const { control } = useFormContext();
  const isAutoLocked = filledFields?.has(name);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: controllerField, fieldState }) => (
        <TextField
          {...controllerField}
          label={field.label}
          fullWidth
          margin="normal"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          disabled={isAutoLocked}
        />
      )}
    />
  );
}
