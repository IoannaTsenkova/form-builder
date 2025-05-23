import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { BaseField } from '../../types/form-types';
import { getFieldError } from '../../utils/helpers';

interface Props {
  field: BaseField;
  name: string;
}

export default function TextFieldRenderer({ field, name }: Props) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

 const errorMessage = getFieldError(errors, name);
  const isTextArea = field.type === 'textarea';

  return (
    <TextField
      {...register(name)}
      label={field.label}
      fullWidth
      margin="normal"
      sx={{ mb: 2 }}
      multiline={isTextArea}
      minRows={isTextArea ? 3 : undefined}
      error={!!errorMessage}
      helperText={errorMessage}
    />
  );
}