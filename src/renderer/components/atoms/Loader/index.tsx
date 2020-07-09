/******************************************************************************
 * Imports
 *****************************************************************************/  
import * as React from 'react';
import { observer } from 'mobx-react';
import "./styles.scss";

/******************************************************************************
 * Interface
 *****************************************************************************/

/** Props */
interface IProps {
  /** ture:表示、false:非表示 */
  visible:boolean;
}

/******************************************************************************
 * Loaderコンポーネント
 *****************************************************************************/
@observer
export default class Loader extends React.Component<IProps> 
{
  static defaultProps:IProps = {
    visible: false
  }

  render() {
    if (!this.props.visible) return null;
    return (
      <div className="a-loader">
        <div className="loader">Loading...</div>
      </div>
    );
  }
}