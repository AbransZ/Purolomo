module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Para que reconozca 'module.exports' y 'require'
  },
  // Hereda las reglas recomendadas
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime", // ¡Clave para Vite/React 17+!
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true, // Habilita el análisis de JSX
    },
  },
  plugins: ["react"],
  settings: {
    react: {
      version: "detect", // Detecta automáticamente la versión de React
    },
  },
  rules: {
    // --- Aquí personalizas tus reglas ---

    // (Ej. Soluciona tu petición de ayer)
    // Marca las variables no usadas como una advertencia (warn)
    "no-unused-vars": "warn", 

    // No requerir 'prop-types' (común en proyectos JS)
    "react/prop-types": "off", 
  },
};