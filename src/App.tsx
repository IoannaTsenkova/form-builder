import { Grid, ThemeProvider } from '@mui/material';
import JsonInput from './components/json-input';
import FormRenderer from './components/form-renderer';
import { useFormSchema } from './hooks/useFormSchema';
import theme from './theme';

function App() {
  const { input, schema, error, handleChange } = useFormSchema();

  return (
    <ThemeProvider theme={theme}>
    <Grid ml={12} display={'flex'} justifyContent="center" flexDirection={'column'} marginInline={10} marginBlock={5} >
      <JsonInput value={input} onChange={handleChange} error={error} />
      {schema && <FormRenderer schema={schema} />}
    </Grid>
    </ThemeProvider>
  );
}

export default App;