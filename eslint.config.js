import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [

    // Ignore folders
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "**/.vite/**",
            "**/coverage/**"
        ]
    },

    // ==========================
    // Backend (Node + Express)
    // ==========================
    {
        files: ["server/**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.node
        },

        rules: {
            ...js.configs.recommended.rules,

            "no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_"
                }
            ],

            "no-undef": "error",

            "no-console": "off"
        }
    },

    // ==========================
    // Frontend (React)
    // ==========================
    {
        files: ["frontend/**/*.{js,jsx}"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },

            globals: {
                ...globals.browser
            }
        },

        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh
        },

        rules: {

            ...js.configs.recommended.rules,

            ...reactHooks.configs.recommended.rules,

            "react-refresh/only-export-components": [
                "warn",
                {
                    allowConstantExport: true
                }
            ],

            "no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_"
                }
            ],

            "no-undef": "error"
        }
    }
];