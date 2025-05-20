import { TextField, Box } from '@mui/material';

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export default function JsonInput({ value, onChange, error }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Paste your form JSON here"
        multiline
        minRows={5}
        maxRows={15}
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error}
        helperText={error || ' '}
        color='secondary'
        style={{borderColor: error ? 'red' : 'green'}}
      />
    </Box>
  );
}
