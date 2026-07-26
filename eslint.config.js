// ESLint 9 flat config — kept deliberately in step with qlim8-app's config so
// the two repos enforce the same guardrails and a contributor moving between
// them meets the same rules.
//
// Purpose is to stop debt accumulating, not to enforce style: unused imports,
// unused bindings, and new `any`. No formatting rules (a Prettier pass would
// bury the diff) and no type-aware linting (slow, and the plain rules already
// cover the debt we care about).
//
// This repo additionally registers @next/eslint-plugin-next. The full
// eslint-config-next is avoided (heavy peer-dependency weight, in a repo whose
// install already needs --legacy-peer-deps) but the bare plugin is light and
// necessary: two components deliberately render a plain <img> for CMS images of
// unknown intrinsic size and suppress no-img-element inline. Without the plugin
// registered those suppressions reference an undefined rule, which is itself an
// ESLint error — so the rule has to exist for the documented intent to hold.

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'next-env.d.ts',
      'attached_assets/**',
      '**/*.d.ts',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'unused-imports': unusedImports,
      react: reactPlugin,
      'react-hooks': reactHooks,
      '@next/next': nextPlugin,
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Next.js correctness rules — the ones that catch real App Router
      // mistakes rather than style. no-img-element is a warning: the two
      // deliberate <img> uses suppress it inline, and any new one should be a
      // visible prompt to reach for next/image first, not a hard block.
      ...nextPlugin.configs.recommended.rules,
      '@next/next/no-img-element': 'warn',

      // --- The core guardrail: dead imports and bindings. -------------------
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // --- Type-safety ratchet, same posture as qlim8-app. -----------------
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'error',

      // Next.js App Router: React is not required in scope, and TypeScript
      // covers prop validation.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'warn',

      'no-empty': ['error', { allowEmptyCatch: false }],
    },
  },

  // Node-side files: config, API routes, scripts.
  {
    files: [
      'next.config.ts',
      'scripts/**/*.{ts,mjs,js}',
      'app/api/**/*.ts',
      'src/lib/**/*.ts',
    ],
    languageOptions: { globals: { ...globals.node } },
  },

  // The single existing test file runs under `node --test`.
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },

  {
    files: ['**/*.mjs', '**/*.js'],
    languageOptions: { globals: { ...globals.node }, sourceType: 'module' },
  },
);
