
/******************************************************************************
 * Env ヘルパー
 * 開発モードかどうかや、windowオブジェクトに関するヘルパー機能を提供する
 *****************************************************************************/

/******************************************************************************
 * Windowの定義
 *****************************************************************************/
interface Window {
  page  :any;
  store :any;
  dao   :any;
}

declare var window:Window;

/******************************************************************************
 * 環境クラス
 *****************************************************************************/
class Env 
{
  constructor() {
    // 開発時のみwindowオブジェクトを定義
    if (this.isDevelop) {
      window.page = {};
      window.store = {};
      window.dao = {};
    }
  }

  /**
   * 開発時はtrue
   */
  get isDevelop() {
    return (process.env.NODE_ENV === "development");
  }

  /**
   * 開発時のみ、windowオブジェクトにページストアをセットする
   */
  setPage(name:string, store:any) {
    if (!this.isDevelop) return;
    window.page[name] = store;
  }

  /**
   * 開発時のみ、windowオブジェクトにストアをセットする 
   */
  setStore(name:string, store:any) {
    if (!this.isDevelop) return;
    window.store[name] = store;
  }

  /**
   * 開発時のみ、windowオブジェクトにServiceストアをセットする
   */
  setDAO(name:string, store:any) {
    if (!this.isDevelop) return;
    window.dao[name] = store;
  }
}

// シングルトンとして提供
const env = new Env();
export default env;