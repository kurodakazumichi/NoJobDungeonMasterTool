/******************************************************************************
 * Imports
 *****************************************************************************/
import ServiceBase from '@/dao/Base/Service';
import { IRepository } from '@/dao/base/Repository';
import ItemCategoryEntity from '@/dao/ItemCategory/Entity';
import ItemCategoryRepository from '@/dao/ItemCategory/Repository';

/******************************************************************************
 * ItemCategory Service
 *****************************************************************************/
class ItemCategoryService extends ServiceBase<ItemCategoryEntity, IRepository<ItemCategoryEntity>>
{
  /** コンストラクタ */
  constructor(name:string, repo:IRepository<ItemCategoryEntity>) 
  {
    super(name, repo);
  }
}

export default new ItemCategoryService("itemCategory", ItemCategoryRepository);