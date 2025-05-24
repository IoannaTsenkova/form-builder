import { Box, Container, Paper, ThemeProvider, Typography } from '@mui/material';
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
        <Typography variant="h4" mb={3} color="secondary" align='center'>
        JSON Form Builder
      </Typography>
        <Grid container spacing={4} alignItems="stretch">
          <Grid size={{ xs: 12, md: 6 }} display={'flex'}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: '#F8F9FA',
                width: '100%',
                boxSizing: 'border-box',
                flex: { xs: 'unset', md: 1 },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2
              }}
            >
              <JsonInput value={input} onChange={handleChange} error={error} />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} display={'flex'}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 2,
                width: '100%',
                boxSizing: 'border-box',
                flex: { xs: 'unset', md: 1 }
              }}
            >
              {schema ? <FormRenderer jsonForm={schema} /> : <Box>Form will appear here...</Box>}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
