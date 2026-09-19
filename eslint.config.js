import eslintPluginAstro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: { parserOptions: { parser: tsParser } },
  },
  {
    ignores: [
      'CourseWare_2026/**',
      'dist/**',
      '.astro/**',
      'node_modules/**',
      'public/pagefind/**',
      'public/slides/**',
      'public/vendor/**',
    ],
  },
];
