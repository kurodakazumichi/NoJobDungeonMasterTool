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

  get isDevelopment() {
    return env.isDevelop;
  }

}
export default new Env();