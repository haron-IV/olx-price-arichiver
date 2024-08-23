import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginPrettier from "eslint-plugin-prettier";


export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    ...tseslint.configs.recommended,
  },
  {
    rules: { semi: ["error", "never"] }
  },
]
