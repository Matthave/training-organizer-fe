const { FlatCompat } = require("@eslint/eslintrc");
const nextPlugin = require("@next/eslint-plugin-next");
const eslintConfigPrettier = require("eslint-config-prettier");

const compat = new FlatCompat();

module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.env*.local",
      "**/next.config.ts",
      "**/.next/**",
      "**/eslint.config.js",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
  eslintConfigPrettier,
];
