/******************************************************************************
 * Imports
 *****************************************************************************/
import ServiceBase from '@/dao/Base/Service';
import { IRepository } from '@/dao/base/Repository';
import EnemyEntity from '@/dao/Enemy/Entity';
import EnemyRepository from '@/dao/Enemy/Repository';

/******************************************************************************
 * Enemy Service
 *****************************************************************************/
class EnemyService extends ServiceBase<EnemyEntity, IRepository<EnemyEntity>>
{
  /** コンストラクタ */
  constructor(name:string, repo:IRepository<EnemyEntity>) 
  {
    super(name, repo);
  }
}

export default new EnemyService("enemy", EnemyRepository);