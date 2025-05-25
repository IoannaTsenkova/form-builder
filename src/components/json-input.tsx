import { TextField, Box, InputAdornment, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextFormatIcon from '@mui/icons-material/TextFormat';

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export default function JsonInput({ value, onChange, error }: Props) {
  const handleClear = () => {
    onChange('');
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      onChange(formatted);
    } catch (err) {
      console.error('Invalid JSON:', err);
      alert('Invalid JSON. Cannot format.');
    }
  };
  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Paste your form JSON here"
        multiline
        minRows={5}
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error}
        helperText={error || ' '}
        color="secondary"
        sx={{ position: 'relative', '-webkit-scrollbar': { display: 'none' } }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                position={'end'}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  display: 'flex',
                  gap: 1,
                  zIndex: 1
                }}
              >
                <IconButton size="small" onClick={handleClear} title="Clear">
                  <CloseIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={handleFormat} title="Format JSON">
                  <TextFormatIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />
    </Box>
  );
}
