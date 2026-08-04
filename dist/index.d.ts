declare namespace Contracts {
    let DEBUG_MODE: boolean;
    /**
     * 設定
     * @param {{debug?:boolean}} config
     */
    function setConfig(config: {
        debug?: boolean;
    }): void;
    function VERIFY(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
    function VERIFY_DEBUG(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
    function REQUIRE(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
    function REQUIRE_DEBUG(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
    function ENSURE(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
    function ENSURE_DEBUG(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
    function INVARIANT(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
    function INVARIANT_DEBUG(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
    /**
     * 評価基本関数。
     * 評価結果がfalseのとき、Errorクラスまたはその継承クラスのインスタンスが指定されていれば例外を投げる。
     * さもなくば MyLogger.error() により、メッセージを出力する
     * @param   {boolean}   isOk      その呼び出し式等の評価結果
     * @param   {string}    [prefix]  エラーメッセージの接頭語
     * @param   {string}    [ngMsg]   エラーメッセージ
     * @param   {new (...args: any[]) => Error}  [error]   エラークラス。Error またはその継承クラス
     * @param   {Object<string, *>}    [eProps={}]   エラークラスに追加するプロパティー
     * @return  {boolean} 評価結果。isOkの値をそのまま返す
     */
    function _check(isOk: boolean, prefix?: string, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
    function _checkDebug(isOk: boolean, prefix?: string, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
}

export { Contracts as default };
