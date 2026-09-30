import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/node_modules/**',
    ],
  },

  {
    files: ['**/*.ts', 'src/lib/*.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
          project: './tsconfig.eslint.json',
      },
    },
    
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },

    rules: {
      'prefer-const': 'error',

      /**
       * [Standard Setting 1] Relaxed checks for unused variables
       * Disables checks for function arguments entirely or allows arguments starting with an underscore (_). 
       * This prevents linting errors for labels in type definitions or unused arguments required to maintain interface compatibility. 
       */
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "vars": "all",
          "args": "none",              // Do not error on unused arguments (most stress-free)
          "ignoreRestSiblings": true,  // Allow ignoring rest elements in destructuring assignments
          "caughtErrors": "none"       // Do not error if 'e' in catch(e) is unused        
        }
      ],

      "@typescript-eslint/no-explicit-any": [
        "error",
        {
          // Configuration that specifically allows the use of 'any' only for argument array spreading (...args: any[])
          "ignoreRestArgs": true 
        }
      ],

      /**
       * [Standard Configuration 2] Adjusting rules that often conflict with type definitions (as needed)
       * Configure the whitespace check (`no-irregular-whitespace`) to allow full-width spaces within comments.
      */
      "no-irregular-whitespace": [
        "error",
        {
          "skipComments": true,  // Ignore special whitespace within comments
          "skipTemplates": true, // Ignore contents of template literals
          "skipRegExps": true    // Ignore contents of regular expressions
        }
      ],
          
      // Allow short-circuit evaluation like `condition && doSomething()`
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
        },
      ],
      

      // Promise-related.
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/await-thenable': 'error',

    },
  },
);
