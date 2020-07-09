/******************************************************************************
 * Imports
 *****************************************************************************/
import * as React from 'react';
import { observer } from 'mobx-react';

import Layout from '@/layout';
import EnemyService from '@/dao/Enemy/Service';
import EnemyEntity from '@/dao/Enemy/Entity';

import * as InputText from '@/components/atoms/Input/Text';
import * as InputNumb from '@/components/atoms/Input/Number';
import * as Icon from '@/components/atoms/Icon';

import Store from './store';

import './styles.scss';

/******************************************************************************
 * Interface
 *****************************************************************************/
/** Props */
export interface IProps {}

/******************************************************************************
 * pEnemiesコンポーネント
 *****************************************************************************/
@observer
class pEnemies extends React.Component<IProps>
{
  /** ページ専用ストア */
  private store:Store;

  constructor(props:IProps) 
  {
    super(props);
    this.store = new Store();
  }

  render() 
  {
    return (
      <div className="p-enemies">

        <h1>敵一覧 (全{this.store.count}件)</h1>

        <div className="search">
          <label>検索</label>:
          <InputText.default 
            value={this.store.query}
            onChange={this.store.onChangeQuery}
          />
        </div>

        <div className="add-form">
          <InputNumb.default
            addClass={"no"}
            value={this.store.newEnemy.no}
            onChange={ this.store.onChangeNewEnemyNo }
          />
          <InputText.default 
            value={this.store.newEnemy.name}
            onChange={ this.store.onChangeNewEnemyName }
          />
          <Icon.default
            type={Icon.Type.PlusCircle}
            onClick={this.store.onClickSaveNewEnemy}
          />
        </div>


        { (0 < this.store.enemies.length) && (
          <table className="enemies-form">
            <thead>
              <tr>
                <th>No</th>
                <th>名前</th>
              </tr>
            </thead>
            <tbody>
              {this.store.enemies.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>
                      <InputNumb.default 
                        addClass={"no"}
                        value={e.no}
                        onChange={(value:number) => {
                          e.setNo(value);
                        }}
                      />
                    </td>
                    <td>
                      <InputText.default 
                        value={e.name}
                        onChange={ (value:string) => {
                          e.setName(value);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }

}

export default Layout(pEnemies);