/******************************************************************************
 * Imports
 *****************************************************************************/
import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import Loader from '@/components/atoms/Loader';

import Env from '@/stores/Env';

import './styles.scss';

/******************************************************************************
 * Layout Component
 *****************************************************************************/
const Layout = (MainComponent:any) => {
  return observer(class extends React.Component {

    render() {
      return (
        <div className="layout">
          <Loader visible={Env.isLock} />
          {this.Header()}
          {this.Main()}
        </div>
      );
    }

    //-------------------------------------------------------------------------
    // Components

    private Header() {
      return (
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/enemy">敵一覧</Link></li>
            </ul>
          </nav>
        </header>
      );
    }

    private Main() {
      return (
        <main>
          <MainComponent {...this.props} />
        </main>
      );
    }

  })
}

export default Layout;