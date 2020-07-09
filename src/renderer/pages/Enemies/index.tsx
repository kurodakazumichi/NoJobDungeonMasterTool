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
      <div className="p-article">
        <h1>敵一覧</h1>
      </div>
    );
  }

}

export default Layout(pEnemies);