module.exports = {
    parser: "@typescript-eslint/parser", // Use TypeScript parser
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    parserOptions: {
      ecmaVersion: 2020, 
      sourceType: "module",
    },
    rules: {
      // Add any TypeScript-specific rules here
    },
  };
  