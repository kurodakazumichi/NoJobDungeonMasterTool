/******************************************************************************
 * Imports
 *****************************************************************************/
import { observable, computed, action } from 'mobx';

/******************************************************************************
 * interface
 *****************************************************************************/
export interface IEntity 
{
  /** エンティティは必ず一意のIDを１つもつ */
  id:string;
  setId(id:string):this;

  /** エンティティのJSONを返す */
  toJSON():any;

  /** data:anyからデータを復元する */
  parseJSON(data:any):void;
}

/******************************************************************************
 * Enemy Base
 *****************************************************************************/
export default abstract class EntityBase implements IEntity
{
  constructor() {
    this._id = "";
  }

  @observable _id:string;

  @computed get id () {
    return this._id;
  }

  @action setId(id:string) {
    this._id = id;
    return this;
  }

  /** 派生先で定義 */
  abstract toJSON(): any;
  abstract parseJSON(data:any):void;
}