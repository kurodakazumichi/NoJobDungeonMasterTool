/******************************************************************************
 * Imports
 *****************************************************************************/
import { observable, computed, action } from 'mobx';
import shortid from 'shortid';

import EntityBase from '@/dao/Base/Entity';
import { isArray } from 'util';

/******************************************************************************
 * IRepository
 *****************************************************************************/
export interface IRepository<T> 
{
  /** リセット */
  reset():void;

  /** ID検索 */
  findById(_id:string):T|null;

  /** 全件検索 */
  findAll():T[];

  /** 件数 */
  count:number;

  /** 保存 */
  save(entity:T):T;

  /** 削除 */
  remove(id:string):boolean;

  /** 全てのデータをテキストにシリアライズ */
  serialize():string;

  /** テキストからリポジトリを復元 */
  deserialize(maybeJsonText:string, instantiatable: { new():T }):void;

  /** クエリ検索 */
  search(query:string):T[];
}

/******************************************************************************
 * Enemy Repository
 *****************************************************************************/
export default abstract class RepositoryBase<T extends EntityBase> implements IRepository<T> 
{
  /** コンストラクタ */
  constructor(name:string) {
    this.name = name;
    this.repository = [];
  }

  /** リセット */
  reset() {
    this.repository = [];
  }  

  /** リポジトリの名前 */
  private name:string;

  /** リポジトリ(Entityの配列) */
  @observable private repository:T[];

  /** データ件数 */
  @computed get count() {
    return this.repository.length;
  }

  /** ID検索 */
  findById(id:string) {
    const found = this.repository.find(e => e.id === id);
    return (found)? found : null;
  }

  /** IDによるIndex検索 */
  findIndexById(id:string) {
    return this.repository.findIndex(e => e.id === id);
  }

  /** 全件検索 */
  findAll() {
    return this.repository;
  }

  /** クエリ検索 */
  abstract search(query:string):T[];

  /** 保存 */
  @action save(entity:T) 
  {
    // 新規の場合
    if (entity.isNew) 
    {
      const id = shortid.generate();
      this.repository.push(entity.setId(id));
      return entity;
    }

    // 更新の場合
    const index = this.findIndexById(entity.id);

    // IDがあるのにrepositoryに存在しないのはおかしいので警告だして保存はする
    if (index < -1) 
    {
      console.warn(`not found record id = ${entity.id} in ${this.name} repository.`)
      this.repository.push(entity);
      return entity;
    }

    else {
      this.repository[index] = entity;
      return entity;
    }
  }

  /** IDによる削除 */
  @action remove(id:string) 
  {
    const index = this.findIndexById(id);

    if (index < 0) return false;

    this.repository = this.repository.splice(index, 1);
    return true;
  }

  /** シリアライズ */
  serialize() {

    const data:any[] = [];

    this.repository.map((enemy) => 
    {
      data.push(enemy.toJSON());
    });

    return JSON.stringify(data);
  
  }

  /** デシリアライズ */
  deserialize(maybeJsonText:string, instantiatable : { new():T; }) 
  {
    // 復元前にリセット
    this.reset();

    // 多分JSONデータなのでパース
    const maybeJson:any = JSON.parse(maybeJsonText);

    // 配列じゃなかったら終了
    if (!isArray(maybeJson)) return;

    // JSONからエンティティを復元
    const json = maybeJson;

    json.map((enemy) => 
    {
      const e = new instantiatable();
      e.parseJSON(enemy);
      this.repository.push(e);
    })
  }
}
