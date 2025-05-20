import { useState } from 'react';
import type { FormSchema } from '../types/form-schema';

export function useFormSchema() {
  const [input, setInput] = useState('');
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setInput(value);
    try {
      const parsed = JSON.parse(value);
      setSchema(parsed);
      setError(null);
    } catch (e) {
      setError('Invalid JSON');
      setSchema(null);
    }
  };

  return { input, schema, error, handleChange };
}
