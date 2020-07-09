/******************************************************************************
 * Imports
 *****************************************************************************/
import { computed, action } from 'mobx';

import ItemCategoryEntity from '@/dao/ItemCategory/Entity';
import ItemCategoryRepository from '@/dao/ItemCategory/Repository';
import env from '@/helpers/env';

/******************************************************************************
 * ItemCategory Service
 *****************************************************************************/
class ItemCategoryService
{
  /** コンストラクタ */
  constructor() 
  {
    env.setDAO("itemCategory", this);
  }

  /** 敵データ数 */
  @computed get count() 
  {
    return ItemCategoryRepository.count;
  }

  /** データの保存、更新 */
  @action save(item:ItemCategoryEntity) 
  {
    return ItemCategoryRepository.save(item);
  }

  /** 全件取得 */
  findAll() 
  {
    return ItemCategoryRepository.findAll();
  }

  /** クエリ検索 */
  search(query:string) {
    return ItemCategoryRepository.search(query);
  }

}

export default new ItemCategoryService();