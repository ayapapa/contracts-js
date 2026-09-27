import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig(
    {
        ignores: [
            '**/dist/**',
            '**/coverage/**',
            '**/node_modules/**',
        ],
    },

    {
        files: ['**/*.ts', 'src/lib/*.ts'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            //tseslint.configs.recommendedTypeChecked,
        ],

        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.eslint.json',
            },
        },
        
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },

        rules: {
            '@typescript-eslint/no-floating-promises': 'error',
            'prefer-const': 'error',
        /**
         * 【常識設定①】未使用変数のチェック緩和
         * 引数（args）のチェックを完全にオフ、またはアンダースコア（_）始まりを許容します。
         * これにより、型定義内のラベルや、インターフェース維持のための未使用引数で怒られなくなります。
         */
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
            "vars": "all",
            "args": "none",              // 引数の未使用はエラーにしない（最もストレスフリー）
            "ignoreRestSiblings": true,  // 分割代入での残余引数の無視を許可
            "caughtErrors": "none"       // catch(e) の e が未使用でもエラーにしない
            }
        ],

        /**
         * 【常識設定②】型定義と競合しやすいルールの調整（必要に応じて）
         * 空白文字のチェック（no-irregular-whitespace）で、コメント内の全角スペースなどを許可します。
         */
        "no-irregular-whitespace": [
            "error",
            {
            "skipComments": true,  // コメント内の特殊な空白を無視
            "skipTemplates": true, // テンプレートリテラル内を無視
            "skipRegExps": true    // 正規表現内を無視
            }
        ],
            
        // `condition && doSomething()` のような短絡評価を許可する
        '@typescript-eslint/no-unused-expressions': [
            'error',
            {
            allowShortCircuit: true,
            },
        ],

        // Promise関連
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/await-thenable': 'error',

        // anyは禁止
        '@typescript-eslint/no-explicit-any': 'error',

        },
    },
);
