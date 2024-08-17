import globals from "globals";
import pluginJs from "@eslint/js";
import someConfig from "some-other-config-you-use";
import eslintConfigPrettier from "eslint-config-prettier";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  someConfig,
  eslintConfigPrettier
];