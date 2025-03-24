import { FlatCompat } from "@eslint/eslintrc";
// import 文の並びを制御
import importPlugin from "eslint-plugin-import";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // 以下を記述
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          // ➀ npm して入れるやつ
          // ➁ @ で import するやつ
          // ➀ 内部で定義したやつ（親 → 兄弟 → 自分）
          "groups": [
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling", "index"]
          ],

          // アルファベット順（大文字と小文字の区別なし）
          "alphabetize": { "order": "asc", "caseInsensitive": true },

          //　グループごとに改行入れる
          "newlines-between": "always"
        }
      ]
    }
  }
];

export default eslintConfig;