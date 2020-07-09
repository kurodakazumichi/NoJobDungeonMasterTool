/******************************************************************************
 * Imports
 *****************************************************************************/
import { computed, action } from 'mobx';

import EnemyEntity from '@/dao/Enemy/Entity';
import EnemyRepository from '@/dao/Enemy/Repository';
import env from '@/helpers/env';

/******************************************************************************
 * Enemy Service
 *****************************************************************************/
class EnemyService
{
  /** コンストラクタ */
  constructor() 
  {
    env.setDAO("enemy", this);
  }

  /** 敵データ数 */
  @computed get count() 
  {
    return EnemyRepository.count;
  }

  /** データの保存、更新 */
  @action save(enemy:EnemyEntity) 
  {
    return EnemyRepository.save(enemy);
  }

  /** 全件取得 */
  findAll() 
  {
    return EnemyRepository.findAll();
  }

  /** クエリ検索 */
  search(query:string) {
    return EnemyRepository.search(query);
  }

}

export default new EnemyService();