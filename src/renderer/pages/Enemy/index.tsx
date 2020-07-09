/******************************************************************************
 * Imports
 *****************************************************************************/
import * as React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

import Layout from '@/layout';

/******************************************************************************
 * Interface
 *****************************************************************************/
/** Props */
export interface IProps extends RouteComponentProps<{id:string|undefined}> {}

/******************************************************************************
 * pEnemyコンポーネント
 *****************************************************************************/
@observer
class pEnemy extends React.Component<IProps>
{
  constructor(props:IProps) {
    super(props);
  }

  render() {
    return (
      <div className="p-article">
        <h1>敵</h1>
      </div>
    );
  }

}

export default Layout(pEnemy);