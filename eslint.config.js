import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier'; // 🆕
import react from 'eslint-plugin-react'; // 🆕

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        sourceType: 'module'
      }
    },
    plugins: {
      reactHooks,
      reactRefresh,
      prettier, // 🆕
      react // 🆕
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'error', // 🆕 важен за форматирането
      quotes: ['error', 'single'], // 🆕 единични кавички
      semi: ['error', 'always'] // 🆕 точка и запетая
    }
  }
);
