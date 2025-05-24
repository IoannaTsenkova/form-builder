import { Box, Typography } from '@mui/material';
import type { GroupField } from '../../types/form-types';
import FieldRenderer from '../field-renderer';

interface Props {
  field: GroupField;
  parentName: string;
  filledFields: Set<string>;
}

export default function GroupFieldRenderer({ field, parentName, filledFields }: Props) {
  const fullName = parentName ? `${parentName}.${field.name}` : field.name;

  return (
    <Box
      sx={{
        mt: 3,
        mb: 4,
        p: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#f9f9f9'
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        {field.label}
      </Typography>

      {field.fields.map((nestedField) => (
        <FieldRenderer
          key={`${fullName}.${nestedField.name}`}
          field={nestedField}
          parentName={field.name}
          filledFields={filledFields}
        />
      ))}
    </Box>
  );
}
