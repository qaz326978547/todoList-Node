module.exports = {
    root: true, // 告訴 ESLint：這是專案的根目錄，不要往上找設定檔

    parser: '@typescript-eslint/parser', // 使用 TypeScript 的語法解析器

    parserOptions: {
        ecmaVersion: 'latest', // 支援最新的 ES 語法（例如 ES2023）
        sourceType: 'module', // 讓 ESLint 支援 import/export
    },

    env: {
        node: true, // 這支程式跑在 Node.js 環境
        es2021: true, // 使用 ES2021 的語法
    },

    extends: [
        'eslint:recommended', // ESLint 官方推薦的基本規則
        'plugin:@typescript-eslint/recommended', // 加上 TypeScript 的檢查規則
        'prettier', // ❗讓 Prettier 覆蓋 ESLint 的格式規則，避免衝突
    ],

    plugins: ['@typescript-eslint'], // 啟用 ts 檢查插件

    rules: {
        '@typescript-eslint/no-unused-vars': ['warn'], // 未使用的變數會警告
        '@typescript-eslint/no-explicit-any': 'off', // 允許使用 any
    },
}
