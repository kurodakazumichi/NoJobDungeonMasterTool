/******************************************************************************
 * Imports
 *****************************************************************************/
import { observable, computed, action } from 'mobx';

/******************************************************************************
 * interface
 *****************************************************************************/
export interface IEntity<T>
{
  /** エンティティは必ず一意のIDを１つもつ */
  id:string;
  setId(id:string):this;

  /** 新規かどうか */
  isNew:boolean;

  /** リセット */
  reset(): void;

  /** 複製を作成する */
  clone():T;

  /** エンティティのJSONを返す */
  toJSON():any;

  /** data:anyからデータを復元する */
  parseJSON(data:any):void;
}

/******************************************************************************
 * Enemy Base
 *****************************************************************************/
export default abstract class EntityBase<T> implements IEntity<T>
{
  /** コンストラクタ */
  constructor() {
    this._id = "";
  }

  //---------------------------------------------------------------------------
  // プロパティ
  @observable _id:string;

  @computed get id () {
    return this._id;
  }

  @action setId(id:string) {
    this._id = id;
    return this;
  }

  /** 新規フラグ */
  @computed get isNew() {
    return this.id === "";
  }

  /** リセットする */
  reset() {
    this._id = "";
  }

  /** 複製を作成する */
  abstract clone():T;

  /** 派生先で定義 */
  abstract toJSON(): any;
  abstract parseJSON(data:any):void;
}