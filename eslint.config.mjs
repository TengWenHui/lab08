import { defineConfig } from "eslint/config";
import jestPlugin from "eslint-plugin-jest";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import securityPlugin from "eslint-plugin-security";
import securityNode from "eslint-plugin-security-node";
import babelParser from "@babel/eslint-parser";

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      parser: babelParser,

      parserOptions: {
        requireConfigFile: false,

        babelOptions: {
          presets: ["@babel/preset-react"],
        },

        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      security: securityPlugin,
      "security-node": securityNode,
    },

    rules: {
      "security/detect-eval-with-expression": "error",
      "security-node/detect-crlf": "error",
    },
  },

  {
    files: ["**/*.test.{js,jsx}"],

    plugins: {
      jest: jestPlugin,
      "testing-library": testingLibraryPlugin,
    },

    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,
      "testing-library/await-async-events": "off",
    },

    languageOptions: {
      globals: {
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        it: "readonly",
        jest: "readonly",
      },
    },
  },

  {
    ignores: [
      "node_modules/**",
      "reports/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "odc-data/**",
      "odc-reports/**",
      "certbot/conf/**",
    ],
  },
]);