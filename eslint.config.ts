import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import css from "@eslint/css";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist/**", "node_modules/**"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    files: ["**/*.{jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  { files: ["**/*.css"], plugins: { css }, language: "css/css" },
]);
