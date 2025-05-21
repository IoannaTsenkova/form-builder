import { Box, Container, Paper, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Grid';
import JsonInput from './components/json-input';
import FormRenderer from './components/form-renderer';
import { useFormSchema } from './hooks/useFormSchema';
import theme from './theme';

function App() {
  const { input, schema, error, handleChange } = useFormSchema();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {/* JSON Input */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: '#F8F9FA',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <JsonInput value={input} onChange={handleChange} error={error} />
            </Paper>
          </Grid>

          {/* Form preview */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 2
              }}
            >
              {schema ? <FormRenderer schema={schema} /> : <Box>Form will appear here...</Box>}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
