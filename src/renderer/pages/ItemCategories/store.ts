/******************************************************************************
 * Imports
 *****************************************************************************/
import { observable, computed, action } from 'mobx';

import ItemCategoryEntity from '@/dao/ItemCategory/Entity';
import ItemCategoryService from '@/dao/ItemCategory/Repository';
import env from '@/helpers/env';

/******************************************************************************
 * Enemies Page Store
 *****************************************************************************/
export default class Store 
{
  /** 新規の敵 */
  private _newItemCategory:ItemCategoryEntity;

  /** 検索クエリ */
  @observable _query:string = "";

  /** コンストラクタ */
  constructor() 
  {
    env.setPage("itemCategories", this);
    this._newItemCategory = new ItemCategoryEntity();

    this.onChangeNewName = this.onChangeNewName.bind(this);
    this.onClickSaveNew  = this.onClickSaveNew.bind(this);
    this.onChangeQuery        = this.onChangeQuery.bind(this);
  }

  //---------------------------------------------------------------------------
  // 全体

  /** 全データ件数 */
  @computed get count() 
  {
    return ItemCategoryService.count;
  }

  //---------------------------------------------------------------------------
  // 敵の新規登録関連

  @computed get newItemCategory() 
  {
    return this._newItemCategory;
  }

  /** Nameの変更 */
  @action onChangeNewName(name:string) 
  {
    this._newItemCategory.setName(name);
  }

  /** 新規敵の保存 */
  @action onClickSaveNew() 
  {
    ItemCategoryService.save(this.newItemCategory.clone());
    this.newItemCategory.reset();
  }

  //---------------------------------------------------------------------------
  // 検索

  @computed get query() 
  {
    return this._query;
  }

  @action onChangeQuery(value:string) 
  {
    this._query = value;
  }

  /** 敵一覧 */  
  @computed get categories() 
  {
    return (this.query === "")
      ? ItemCategoryService.findAll()
      : ItemCategoryService.search(this.query);
  }
}
