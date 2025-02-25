module.exports = {
    root: true,
    parser: "@typescript-eslint/parser", // Use TypeScript parser
    plugins: ['@typescript-eslint'],
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
  