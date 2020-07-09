/******************************************************************************
 * Imports
 *****************************************************************************/
import { observable, computed, action } from 'mobx';
import shortid from 'shortid';

import EnemyEntity from '@/dao/Enemy/Entity';

/******************************************************************************
 * IRepository
 *****************************************************************************/
interface IRepository<T> 
{
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
}

/******************************************************************************
 * Enemy Repository
 *****************************************************************************/
class EnemyRepository implements IRepository<EnemyEntity> 
{

  @observable private repository:EnemyEntity[];

  constructor() {
    this.repository = [];
  }

  @computed get count() {
    return this.repository.length;
  }

  findById(id:string) {
    const found = this.repository.find(e => e.id === id);
    return (found)? found : null;
  }

  findIndexById(id:string) {
    return this.repository.findIndex(e => e.id === id);
  }

  findAll() {
    return this.repository;
  }

  @action save(entity:EnemyEntity) 
  {
    // 新規の場合
    if (entity.isNew) {
      const id = shortid.generate();
      this.repository.push(entity.setId(id));
      return entity;
    }

    // 更新の場合
    const index = this.findIndexById(entity.id);

    // IDがあるのにrepositoryに存在しないのはおかしいので警告だして保存はする
    if (index < -1) 
    {
      console.warn(`not found record id = ${entity.id}.`)
      this.repository.push(entity);
      return entity;
    }

    else {
      this.repository[index] = entity;
      return entity;
    }
  }

  @action remove(id:string) 
  {
    const index = this.findIndexById(id);

    if (index < 0) return false;

    this.repository = this.repository.splice(index, 1);
    return true;
  }
}

const repository:IRepository<EnemyEntity> = new EnemyRepository;
export default repository;