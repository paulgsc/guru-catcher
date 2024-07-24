//@ts-check
import url from "node:url"
import { FlatCompat } from "@eslint/eslintrc"
import eslint from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import prettier from "eslint-config-prettier"
import deprecationPlugin from "eslint-plugin-deprecation"
import importPlugin from "eslint-plugin-import"
import jsonPlugin from "eslint-plugin-json"
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"
import prettierPlugin from "eslint-plugin-prettier"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort"
import unicornPlugin from "eslint-plugin-unicorn"
import unusedImports from "eslint-plugin-unused-imports"
import globals from "globals"
import tseslint from "typescript-eslint"

const __dirname = url.fileURLToPath(new URL(".", import.meta.url))
const compat = new FlatCompat({ baseDirectory: __dirname })

export default tseslint.config(
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
      ["simple-import-sort"]: simpleImportSortPlugin,
      "unused-imports": unusedImports,
      "@typescript-eslint/eslint-plugin": tsPlugin,
      deprecation: deprecationPlugin,
      ["unicorn"]: unicornPlugin,
      ["react-hooks"]: reactHooksPlugin,
      ["react"]: reactPlugin,
      ["jsx-a11y"]: jsxA11yPlugin,
      ["import"]: importPlugin,
      ["next"]: nextPlugin,
    },
  },
  {
    ignores: [
      "**/jest.config.js",
      "**/tailwind.config.js",
      "**/node_modules/**",
      "**/dist/**",
      "**/package.json",
      "**/package-lock.json",
      "**/fixtures/**",
      "**/coverage/**",
      "**/__snapshots__/**",
      "**/.docusaurus/**",
      "**/build/**",
      "**/.next/**",
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.es2020,
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        ecmaFeatures: {
          jsx: true,
        },
        cacheLifetime: {
          // we pretty well never create/change tsconfig structure - so no need to ever evict the cache
          // in the rare case that we do - just need to manually restart their IDE.
          glob: "Infinity",
        },
        project: ["tsconfig.json", "packages/*/tsconfig.json"],
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      "logical-assignment-operators": "error",
      "no-else-return": "error",
      "no-mixed-operators": "error",
      "no-console": "error",
      "no-process-exit": "error",
      "no-fallthrough": [
        "error",
        { commentPattern: ".*intentional fallthrough.*" },
      ],
      "one-var": ["error", "never"],

      // enforce a sort order across the codebase
      "simple-import-sort/imports": "error",
    },
  },

  {
    files: ["**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // turn off other type-aware rules
      "deprecation/deprecation": "off",
      "@typescript-eslint/internal/no-poorly-typed-ts-props": "off",

      // turn off rules that don't apply to JS code
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },

  // tools and tests
  //
  {
    files: [
      "**/tools/**/*.{ts,tsx,cts,mts}",
      "**/tests/**/*.{ts,tsx,cts,mts}",
      "packages/repo-tools/**/*.{ts,tsx,cts,mts}",
      "packages/integration-tests/**/*.{ts,tsx,cts,mts}",
    ],
    rules: {
      // allow console logs in tools and tests
      "no-console": "off",
    },
  },
  {
    files: ["eslint.config.{js,cjs,mjs}"],
    rules: {
      // requirement
      "import/no-default-export": "off",
    },
  },
  {
    files: ["apps/guru/**/*.{ts,tsx,cts,mts}"],

    extends: [
      eslint.configs.recommended,

      ...compat.config(jsxA11yPlugin.configs.recommended),
      ...compat.config(reactPlugin.configs.recommended),
      ...compat.config(reactHooksPlugin.configs.recommended),

      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],

    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // ts rules

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          caughtErrors: "all",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", disallowTypeAnnotations: true },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowIIFEs: true },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        { allowConstantLoopConditions: true },
      ],
      "@typescript-eslint/prefer-literal-enum-member": [
        "error",
        {
          allowBitwiseExpressions: true,
        },
      ],
      "@typescript-eslint/prefer-string-starts-ends-with": [
        "error",
        {
          allowSingleElementEquality: "always",
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: false,
          allowAny: false,
          allowNullish: false,
          allowRegExp: true,
        },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": [
        "error",
        {
          ignoreConditionalTests: true,
          ignorePrimitives: true,
        },
      ],

      // eslint-plugin-unicorn
      "unicorn/no-typeof-undefined": "error",
      // make sure we're not leveraging any deprecated APIs
      // 'deprecation/deprecation': 'error'
    },
  },
  {
    files: ["**/*.{mdx,jsx,tsx}"],

    rules: {
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "import/no-anonymous-default-export": "error",
      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "jsx-a11y/alt-text": [
        "error",
        {
          elements: ["img"],
          img: ["Image"],
        },
      ],
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "react/jsx-no-target-blank": "off",
    },
  },
  {
    files: ["**/*.json"],
    plugins: { jsonPlugin },
    processor: "json/json",
    rules: {
      // or the equivalent:
      "json/*": ["error", { allowComments: true }],
    },
  }
)
