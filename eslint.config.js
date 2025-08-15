const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Pliki, które mają być sprawdzane
    ignores: [
      "**/node_modules/**", // Ignoruj cały katalog node_modules
      "**/dist/**", // Ignoruj cały katalog dist
      "**/build/**", // Ignoruj cały katalog build
      "**/.env*.local", // Ignoruj pliki .env*.local
      "**/next.config.ts", // Ignoruj plik Next.config.js
      "**/.next/**", // Ignoruj folder .next
      "**/eslint.config.js", // Ignoruj plik eslint.config.js
      "**/prettier.config.js", // Ignoruj plik prettier.config.js
      "**/.prettier.json", // Ignoruj plik .prettier.json
      "**/tsconfig.json", // Ignoruj plik tsconfig.json
    ],

    languageOptions: {
      parser: require("@typescript-eslint/parser"), // Przeniesiony i poprawiony parser
      parserOptions: {
        project: ["./tsconfig.json"], // Włącz analizę TypeScript na podstawie tsconfig.json
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Włącz obsługę JSX
        },
      },
      globals: {
        React: true, // Dodaj globalną zmienną React, aby uniknąć błędów
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"), // Włącz wtyczkę TypeScript
      react: require("eslint-plugin-react"), // Włącz wtyczkę React
      "react-hooks": require("eslint-plugin-react-hooks"), // Włącz wtyczkę React Hooks
      prettier: require("eslint-plugin-prettier"), // Włącz Prettier jako plugin ESLint
    },
    settings: {
      react: {
        version: "detect", // Automatycznie wykrywaj wersję React
      },
    },
    rules: {
      // Zalecane reguły ESLint
      "no-console": "warn",

      // Reguły specyficzne dla TypeScript
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off", // Wyłącz wymóg jawnego typu zwracanego funkcji

      // Reguły specyficzne dla React
      "react/prop-types": "off", // Wyłącz sprawdzanie prop-types

      // Reguły specyficzne dla React Hooks
      "react-hooks/rules-of-hooks": "error",
      // Tablica zależności useEffect
      "react-hooks/exhaustive-deps": "off",

      // Konfiguracja Prettier
      "prettier/prettier": "error", // Użyj konfiguracji Prettier z .prettier.json
    },
    linterOptions: {
      reportUnusedDisableDirectives: true, // Zgłaszaj nieużywane dyrektywy disable ESLint
    },
  },
  eslintConfigPrettier,
];
