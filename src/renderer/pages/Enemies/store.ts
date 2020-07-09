/******************************************************************************
 * Imports
 *****************************************************************************/
import { observable, computed, action } from 'mobx';

import EnemyEntity from '@/dao/Enemy/Entity';
import EnemyService from '@/dao/Enemy/Service';
import env from '@/helpers/env';

/******************************************************************************
 * Enemies Page Store
 *****************************************************************************/
export default class Store 
{
  /** 新規の敵 */
  private _newEnemy:EnemyEntity;

  /** 検索クエリ */
  @observable _query:string = "";

  /** コンストラクタ */
  constructor() 
  {
    env.setPage("enemies", this);
    this._newEnemy = new EnemyEntity();

    this.onChangeNewEnemyNo   = this.onChangeNewEnemyNo.bind(this);
    this.onChangeNewEnemyName = this.onChangeNewEnemyName.bind(this);
    this.onClickSaveNewEnemy  = this.onClickSaveNewEnemy.bind(this);

    this.onChangeQuery        = this.onChangeQuery.bind(this);
  }

  //---------------------------------------------------------------------------
  // 全体

  /** 全データ件数 */
  @computed get count() 
  {
    return EnemyService.count;
  }

  //---------------------------------------------------------------------------
  // 敵の新規登録関連

  @computed get newEnemy() 
  {
    return this._newEnemy;
  }

  /** Noの変更 */
  @action onChangeNewEnemyNo(no:number) 
  {
    this._newEnemy.setNo(no);
  }

  /** Nameの変更 */
  @action onChangeNewEnemyName(name:string) 
  {
    this._newEnemy.setName(name);
  }

  /** 新規敵の保存 */
  @action onClickSaveNewEnemy() 
  {
    EnemyService.save(this.newEnemy.clone());
    this.newEnemy.reset();
    this.newEnemy.setNo(EnemyService.count);
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
  @computed get enemies() 
  {
    return (this.query === "")
      ? EnemyService.findAll()
      : EnemyService.search(this.query);
  }
}
