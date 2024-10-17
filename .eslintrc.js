const INDENT_AMOUNT = 2;

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    jest: true
  },
  plugins: [
    "@typescript-eslint",
    "jest",
    "simple-import-sort",
    "@stylistic/js"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  globals: {
    React: true,
    JSX: true
  },
  rules: {
    // disable the rule for all files
    "no-shadow": "off",
    "no-unused-vars": "off",
    "prettier/prettier": "off",

    // errors
    "block-spacing": "error",
    "brace-style": ["error", "stroustrup"],
    "comma-dangle": ["error", "never"],
    "comma-spacing": "error",
    curly: "error",
    "dot-notation": "error",
    eqeqeq: "error",
    "@stylistic/js/no-multi-spaces": "error",
    "@stylistic/js/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "@stylistic/js/space-in-parens": "error",
    "@stylistic/js/array-bracket-spacing": ["error"],
    "@stylistic/js/arrow-spacing": "error",
    "@stylistic/js/space-unary-ops": "error",
    "@stylistic/js/keyword-spacing": "error",
    indent: ["error", INDENT_AMOUNT, { SwitchCase: 1 }],
    "@stylistic/js/key-spacing": [
      "error",
      { mode: "strict", beforeColon: false, afterColon: true }
    ],
    "no-console": ["error", { allow: ["error"] }],
    "no-duplicate-imports": ["error", { includeExports: true }],
    "no-fallthrough": "error",
    "no-sequences": "error",
    "no-trailing-spaces": "error",
    "no-undef": "error",
    quotes: ["error", "double", { avoidEscape: true }],
    semi: "error",
    "space-before-blocks": "error",
    "space-infix-ops": "error",

    "simple-import-sort/imports": "error",

    "react-hooks/exhaustive-deps": "error",
    "react/jsx-indent-props": ["error", INDENT_AMOUNT],
    "react/jsx-indent": [
      "error",
      INDENT_AMOUNT,
      { indentLogicalExpressions: true }
    ],
    "react/jsx-key": "error",
    "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary"] }],

    "@typescript-eslint/ban-types": ["off"],
    "@typescript-eslint/no-unused-vars": ["off"],

    // TODO: Rules to fix
    radix: "warn",

    "react/no-unstable-nested-components": "warn",

    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-shadow": ["off"]
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Side effect imports.
              ["^\\u0000"],
              // Packages `react` related packages come first.
              ["^react", "^@?\\w"],
              // Internal packages.
              [
                "^(@analytics|@auth|@bluetooth|@brandPreferences|@connectToEquipmentHome|@deleteAccount|@drawing|@favoriteStore|@feedback|@home|@interactiveTroubleshoot|@legalInfo|@limitless|@literature|@myJobs|@nfc|@onboarding|@parts|@partsAvailability|@partsCrossReference|@product|@productCatalog|@productData|@productRegistration|@shared|@supersession|@techTips|@thermostat|@versionDetails|@warranty)(/.*|$)"
              ],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"]
            ]
          }
        ]
      }
    },
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/ban-types": [
          "error",
          {
            extendDefaults: true,
            types: {
              "{}": false
            }
          }
        ],
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-shadow": "warn",
        "@typescript-eslint/no-unused-vars": ["error"]
      }
    }
  ]
};
