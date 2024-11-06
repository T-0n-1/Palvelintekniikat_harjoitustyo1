import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  			{ ignores: ["venv/", ".idea/", ".git/", "node_modules/", ".vscode", ".DS_Store", "config.codekit3", ".gitignore", "dist/", "Thumbs.db", ".eslintcache", ".env", "test/", "tests/", "bs-config.js", "tsconfig.json", "*.mjs", "*.min.js"] },  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];