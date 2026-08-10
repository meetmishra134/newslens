import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
  files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
  languageOptions: {
    globals: {
      ...globals.node,
    },
    parserOptions: {
      tsconfigRootDir: __dirname,
    },
  },
});
