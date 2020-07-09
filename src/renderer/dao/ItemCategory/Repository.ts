/******************************************************************************
 * Imports
 *****************************************************************************/
import ItemCategoryEntity from '@/dao/ItemCategory/Entity';
import RepositoryBase, { IRepository } from '@/dao/Base/Repository';

/******************************************************************************
 * Enemy Repository
 *****************************************************************************/
class ItemCategoryRepository extends RepositoryBase<ItemCategoryEntity> 
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

const repository:IRepository<ItemCategoryEntity> = new ItemCategoryRepository("ItemCategory");
export default repository;