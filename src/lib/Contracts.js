'use strict';

/**
 * 条件チェック
 */
export const Contracts = {
  DEBUG_MODE: false,

  /**
   * 設定
   * @param {object} config 
   */
  setConfig(config) {
    if (config) {
      Contracts.DEBUG_MODE = config.debug || false;
    }
  },

  /**
   * 条件チェック。
   * isOk === false時は、errorが指定されていれば例外(mgMsg)を投げ、さもなくば、console.error(ngMsg)によりエラーメッセージを出力する。
   * @param   {boolean}   isOk      その呼び出し式等の評価結果
   * @param   {string}    [ngMsg]   エラーメッセージ
   * @param   {function}  [error=Error] エラークラス。Error またはその継承クラス
   * @param   {object}    [eProps={}]   エラークラスに追加するプロパティー
   * @return  {boolean} 評価結果。isOkの値をそのまま返す
   */
  VERIFY: (isOk, ngMsg, error = Error, eProps={}) => Contracts._check(isOk, 'VERIFY', ngMsg, error, eProps),

  /**
   * 条件チェック。（デバッグ用：デバッグモード時は実行メッセージ出力・例外発生なし）。
   * 評価結果がfalseのとき、Errorクラスまたはその継承クラスのインスタンスが指定されていれば例外を投げる。
   * さもなくば MyLogger.error() により、メッセージを出力する
   * @param   {boolean}   isOk      その呼び出し式等の評価結果
   * @param   {string}    [ngMsg]   エラーメッセージ
   * @param   {function}  [error]   エラークラス。Error またはその継承クラス
   * @return  {boolean} 評価結果。isOkの値をそのまま返す
   */
  VERIFY_DEBUG: (isOk, ngMsg, error = Error, eProps={}) => Contracts._checkDebug(isOk, 'VERIFY_DEBUG', ngMsg, error, eProps),

  /**
   * 事前条件チェック。
   * 検証済みのはずの引数のチェックなど、事前に保証されるべき条件の検証用に利用する。
   * isOk === false時は、errorが指定されていれば例外(mgMsg)を投げ、さもなくば、console.error(ngMsg)によりエラーメッセージを出力する。
   * @param   {boolean} isOk       その呼び出し式等の評価結果
   * @param   {string}  [ngMsg]    エラーメッセージ
   * @param   {Error}   [error=Error]  エラークラス。Error またはその継承クラス
   * @param   {object}  [eProps={}]   エラークラスに追加するプロパティー
   * @return  {boolean} 評価結果。isOkの値をそのまま返す
   */
  REQUIRE: (isOk, ngMsg, error=Error, eProps={}) => Contracts._check(isOk, 'REQUIRE', ngMsg, error, eProps),

  /**
   * 事前条件チェック。（デバッグ用：デバッグモード時は実行メッセージ出力・例外発生なし）。
   * 評価結果がfalseのとき、Errorクラスまたはその継承クラスのインスタンスが指定されていれば例外を投げる。
   * さもなくば MyLogger.error() により、メッセージを出力する
   * @param   {boolean}   isOk      その呼び出し式等の評価結果
   * @param   {string}    [ngMsg]   エラーメッセージ
   * @param   {function}  [error]   エラークラス。Error またはその継承クラス
   * @param   {object}    [eProps={}]   エラークラスに追加するプロパティー
   * @return  {boolean} 評価結果。isOkの値をそのまま返す
   */
  REQUIRE_DEBUG: (isOk, ngMsg, error = Error, eProps={}) => Contracts._checkDebug(isOk, 'REQUIRE_DEBUG', ngMsg, error, eProps),

  /**
   * 事後条件チェック。
   * 関数のリターン時に保証されるべき条件チェック等、戻り値やオブジェクト状態など、保証されるべき条件の検証用に利用する
   * isOk === false時は、errorが指定されていれば例外(mgMsg)を投げ、さもなくば、console.error(ngMsg)によりエラーメッセージを出力する。
   * @param   {boolean}   isOk       その呼び出し式等の評価結果
   * @param   {string}    [ngMsg]    エラーメッセージ
   * @param   {function}  [error=Error] エラークラス。Error またはその継承クラス
   * @param   {object}    [eProps={}]   エラークラスに追加するプロパティー
   * @return  {boolean} 評価結果。isOkをそのまま返す
   */
  ENSURE: (isOk, ngMsg, error = Error, eProps={}) => Contracts._check(isOk, 'ENSURE', ngMsg, error, eProps),

  /**
   * 事後条件チェック。（デバッグ用：デバッグモード時は実行メッセージ出力・例外発生なし）。
   * 評価結果がfalseのとき、Errorクラスまたはその継承クラスのインスタンスが指定されていれば例外を投げる。
   * さもなくば MyLogger.error() により、メッセージを出力する
   * @param   {boolean}   isOk      その呼び出し式等の評価結果
   * @param   {string}    [ngMsg]   エラーメッセージ
   * @param   {function}  [error]   エラークラス。Error またはその継承クラス
   * @param   {object}    [eProps={}]   エラークラスに追加するプロパティー
   * @return  {boolean} 評価結果。isOkの値をそのまま返す
   */
  ENSURE_DEBUG: (isOk, ngMsg, error = Error, eProps={}) => Contracts._checkDebug(isOk, 'ENSURE_DEBUG', ngMsg, error, eProps),

  /**
   * 不変条件チェック。
   * 関数の呼び出し前後で保証されるべき条件をチェックするときに利用する
   * isOk === false時は、errorが指定されていれば例外(mgMsg)を投げ、さもなくば、console.error(ngMsg)によりエラーメッセージを出力する。
   * @param   {boolean}   isOk       その呼び出し式等の評価結果
   * @param   {string}    [ngMsg]    エラーメッセージ
   * @param   {function}  [error=Error] エラークラス。Error またはその継承クラス
   * @param   {object}    [eProps={}]   エラークラスに追加するプロパティー
   * @return  {boolean} 評価結果。isOkをそのまま返す
   */
  INVARIANT: (isOk, ngMsg, error = Error, eProps={}) => Contracts._check(isOk, 'INVARIANT', ngMsg, error, eProps),

  /**
   * 不変条件チェック。。（デバッグ用：デバッグモード時は実行メッセージ出力・例外発生なし）。
   * 関数の呼び出し前後で保証されるべき条件をチェックするときに利用する
   * isOk === false時は、errorが指定されていれば例外(mgMsg)を投げ、さもなくば、console.error(ngMsg)によりエラーメッセージを出力する。
   * @param   {boolean}   isOk       その呼び出し式等の評価結果
   * @param   {string}    [ngMsg]    エラーメッセージ
   * @param   {function}  [error=Error] エラークラス。Error またはその継承クラス
   * @param   {object}    [eProps={}]   エラークラスに追加するプロパティー
   * @return  {boolean} 評価結果。isOkをそのまま返す
   */
  INVARIANT_DEBUG: (isOk, ngMsg, error = Error, eProps={}) => Contracts._checkDebug(isOk, 'INVARIANT_DEBUG', ngMsg, error, eProps),

  /**
   * 評価基本関数。
   * 評価結果がfalseのとき、Errorクラスまたはその継承クラスのインスタンスが指定されていれば例外を投げる。
   * さもなくば MyLogger.error() により、メッセージを出力する
   * @param   {boolean}   isOk      その呼び出し式等の評価結果
   * @param   {string}    [prefix]  エラーメッセージの接頭語
   * @param   {string}    [ngMsg]   エラーメッセージ
   * @param   {function}  [error]   エラークラス。Error またはその継承クラス
   * @param   {object}    [eProps={}]   エラークラスに追加するプロパティー
   * @return  {boolean} 評価結果。isOkの値をそのまま返す
   */
  _check(isOk, prefix = "CHECK", ngMsg = null, error = Error, eProps={}) {
    if (!isOk) {
      const msg = `[${prefix}]${ngMsg??""}`;
      if (error) throw Object.assign(new error(msg), eProps);
      if (ngMsg) console.error(msg, eProps);
    }
    return isOk;
  },

  /**
   * デバッグ用評価基本関数（デバッグモード時以外はメッセージ出力・例外発生なし）。
   * 評価結果がfalseのとき、Errorクラスまたはその継承クラスのインスタンスが指定されていれば例外を投げる。
   * さもなくば MyLogger.error() により、メッセージを出力する
   * @param   {boolean}   isOk      その呼び出し式等の評価結果
   * @param   {string}    [prefix]  エラーメッセージの接頭語
   * @param   {string}    [ngMsg]   エラーメッセージ
   * @param   {function}  [error]   エラークラス。Error またはその継承クラス
   * @param   {object}    [eProps={}]   エラークラスに追加するプロパティー
   * @return  {boolean} 評価結果。isOkの値をそのまま返す
   */
  _checkDebug: (isOk, prefix = "CHECK_DEBUG", ngMsg = null, error = Error, eProps={}) =>
    Contracts.DEBUG_MODE ? Contracts._check(isOk, prefix, ngMsg, error, eProps) : isOk,

}
