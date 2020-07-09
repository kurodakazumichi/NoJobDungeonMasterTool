/******************************************************************************
 * Imports
 *****************************************************************************/
import { observable, computed, action } from 'mobx';
import EntityBase from '@/dao/Base/Entity';

/******************************************************************************
 * Enemy Entity
 *****************************************************************************/
export default class EnemyEntity extends EntityBase
{
  /** コンストラクタ */
  constructor(){
    super();
    this._no   = 0;
    this._name = "";
  }
  
  //---------------------------------------------------------------------------
  // プロパティ

  /** No */
  @observable _no:number;

  @computed get no() {
    return this._no;
  }

  @action setNo(no:number) {
    this._no = parseInt(no.toString());
    return this;
  }

  /** 名称 */
  @observable _name:string;

  @computed get name() {
    return this._name;
  }

  @action setName(name:string) {
    this._name = name;
    return this;
  }

  //---------------------------------------------------------------------------
  // JSON

  toJSON() {
    const data = {
      id  : this.id,
      no  : this.no,
      name: this.name,
    }

    return data;
  }

  parseJSON(data:any) {
    this
      .setId(data.id)
      .setNo(data.no)
      .setName(data.name);
  }
}