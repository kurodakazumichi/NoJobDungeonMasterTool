/******************************************************************************
 * Imports
 *****************************************************************************/
import * as React from 'react';
import { observer } from 'mobx-react';

import Layout from '@/layout';

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

  render() {
    return (
      <div className="p-enemies">
        <h1>敵一覧</h1>

        <div className="search">
          <label>検索</label>:<input defaultValue="しょぼん"/>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>名前</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input /></td>
              <td><input /></td>
            </tr>
          </tbody>
        </table>


      </div>
    );
  }

}

export default Layout(pEnemies);