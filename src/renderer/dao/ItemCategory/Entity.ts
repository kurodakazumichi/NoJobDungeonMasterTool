/******************************************************************************
 * Imports
 *****************************************************************************/
import { observable, computed, action } from 'mobx';
import EntityBase from '@/dao/Base/Entity';

/******************************************************************************
 * Item Category Entity
 *****************************************************************************/
export default class ItemCategoryEntity extends EntityBase<ItemCategoryEntity>
{
  /** コンストラクタ */
  constructor(){
    super();
    this._name = "";
  }
  
  //---------------------------------------------------------------------------
  // プロパティ

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
  // メソッド

  reset() {
    super.reset();
    this._name = "";
  }

  public clone() {
    return new ItemCategoryEntity()
      .setId(this.id)
      .setName(this.name);
  }

  //---------------------------------------------------------------------------
  // JSON

  toJSON() {
    const data = {
      id  : this.id,
      name: this.name,
    }

    return data;
  }

  parseJSON(data:any) {
    this
      .setId(data.id)
      .setName(data.name);
  }
}