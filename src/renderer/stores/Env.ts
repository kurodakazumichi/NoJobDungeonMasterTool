/******************************************************************************
 * Imports
 *****************************************************************************/
import { observable, computed, action } from 'mobx';

import env from '@/helpers/env';

/******************************************************************************
 * 環境に関するストア
 *****************************************************************************/
class Env 
{
  constructor() {
    env.setStore("env", this);
  }

  /** ロック中かどうかのフラグ */
  @observable private _isLock:boolean = false;

  @computed get isLock() {
    return this._isLock;
  }

  @action lock() {
    this._isLock = true;
  }

  @action unlock() {
    this._isLock = false;
  }

  /** 開発モードかどうか */
  get isDevelopment() {
    return env.isDevelop;
  }

  /** 現在のパス(ファイル参照先) */
  private _path:string = "";

  get path() { 
    return this._path 
  };

  set path(value:string) {
     this._path = value;
  }

  get hasPath() {
    return this.path !== "";
  }

}
export default new Env();