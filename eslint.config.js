// eslint.config.js

import js from '@eslint/js';
import globals from 'globals';
// Assuming these plugins are correctly installed as dependencies/devDependencies
import reactHooks from 'eslint-plugin-react-hooks'; 
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist']), // Ignora la carpeta dist

    // --- Configuración #1: Para tu código React (JS/JSX en src) ---
    {
        files: ['src/**/*.{js,jsx}'], // Aplica solo a archivos .js/.jsx dentro de 'src'
        // ---> ¡EXTENDS AQUÍ! <---
        extends: [
            js.configs.recommended, // Reglas recomendadas de ESLint
            // React specific recommendations - check if these plugins are installed/needed
             'plugin:react/recommended', 
             'plugin:react/jsx-runtime' // If using new JSX transform
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser, // Globales del navegador para React
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
                // Si usas TypeScript, necesitas el parser:
                // parser: '@typescript-eslint/parser',
                // project: ['./tsconfig.json'], // Path to your tsconfig
            },
        },
        plugins: { // Define los plugins que usas
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            // Si usas TypeScript:
            // '@typescript-eslint': tsEslint, 
            // Si usas eslint-plugin-react:
            // 'react': reactPlugin, 
        },
        settings: { // Settings for react plugin if used
            react: {
                version: 'detect', // Automatically detect React version
            },
        },
        rules: { // Define las reglas
            'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }], // Changed to warn
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // Adjusted rule
            // Si usas eslint-plugin-react:
            // 'react/prop-types': 'off', // Often turned off when using TypeScript or simple projects
        },
    },

    // --- Configuración #2: Para tu código Backend (server.js) ---
    {
        files: ['server.js'], // Aplica SOLO a server.js
        languageOptions: {
            ecmaVersion: 2020, // O la versión de Node que uses
            sourceType: 'module', // Porque usas 'import'
            globals: {
                ...globals.node, // <-- AÑADE LAS GLOBALES DE NODE AQUÍ!
            }
        },
        rules: {
            'no-undef': 'error'
        }
    }
]);

// Nota: Asegúrate de tener instalados los plugins que uses (eslint-plugin-react-hooks, eslint-plugin-react-refresh, etc.)
// Si usas TypeScript, necesitarás @typescript-eslint/parser y @typescript-eslint/eslint-plugin
// Si usas eslint-plugin-react, necesitarás eslint-plugin-react