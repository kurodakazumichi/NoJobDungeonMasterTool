/******************************************************************************
 * Imports
 *****************************************************************************/
import EnemyEntity from '@/dao/Enemy/Entity';
import RepositoryBase, { IRepository } from '@/dao/Base/Repository';

/******************************************************************************
 * Enemy Repository
 *****************************************************************************/
class EnemyRepository extends RepositoryBase<EnemyEntity> 
{
  /** ワード検索 */
  search(query:string) 
  {
    return this.findAll().filter((enemy) => 
    {
      // とりあえず名前の前方一致
      return enemy.name.indexOf(query) === 0;
    })
  }
}

const repository:IRepository<EnemyEntity> = new EnemyRepository("Enemy");
export default repository;