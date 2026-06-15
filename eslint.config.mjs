import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        BudgetManager: "readonly",
        Expense: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-alert": "warn",
      "no-var": "warn",
      "max-depth": ["warn", { max: 3 }],
      "max-statements": [
        "warn",
        { max: 15 },
        { ignoreTopLevelFunctions: true },
      ],
    },
  },
  eslintConfigPrettier,
];
