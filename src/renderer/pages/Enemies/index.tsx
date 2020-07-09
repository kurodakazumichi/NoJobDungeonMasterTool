/******************************************************************************
 * Imports
 *****************************************************************************/
import * as React from 'react';
import { observer } from 'mobx-react';

import Layout from '@/layout';
import EnemyService from '@/dao/Enemy/Service';
import EnemyEntity from '@/dao/Enemy/Entity';

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
  constructor(props:IProps) {
    super(props);
  }

  onClick() {
    EnemyService.save(new EnemyEntity(0, "テスト"));
  }

  render() {
    return (
      <div className="p-enemies">
        <h1>敵一覧{EnemyService.count}</h1>
        <button onClick={ this.onClick }>Save</button>

        <div className="search">
          <label>検索</label>:<input defaultValue="しょぼん"/>
        </div>
        { (0 < EnemyService.count) && (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>名前</th>
              </tr>
            </thead>
            <tbody>
              {EnemyService.findAll().map((e) => {
                return (
                  <tr key={e.id}>
                    <td>{e.no}</td>
                    <td>{e.name}</td>
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