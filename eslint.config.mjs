// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Extend Next.js and TypeScript rules
  ...compat.extends(
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'eslint:recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:prettier/recommended'
  ),

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  {
    files: ['**/*.scss', '**/*.css'],
    rules: {
      // SCSS-specific rules can go here if using stylelint
    },
  },
];
