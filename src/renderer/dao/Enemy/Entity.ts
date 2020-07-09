/******************************************************************************
 * Imports
 *****************************************************************************/
import { observable, computed, action } from 'mobx';

/******************************************************************************
 * Enemy Entity
 *****************************************************************************/
export default class EnemyEntity
{
  constructor(
    no:number = 0,
    name:string = "",
  ){
    this._id   = "";
    this._no   = no;
    this._name = name;
  }

  @observable _id:string;

  @computed get id () {
    return this._id;
  }

  @action setId(id:string) {
    this._id = id;
    return this;
  }
  
  @observable _no:number;

  @computed get no() {
    return this._no;
  }

  @action setNo(no:number) {
    this._no = no;
    return this;
  }

  @observable _name:string;

  @computed get name() {
    return this._name;
  }

  @action setName(name:string) {
    this._name = name;
    return this;
  }

  @computed get isNew() {
    return this.id === "";
  }
}