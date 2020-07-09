/******************************************************************************
 * Imports
 *****************************************************************************/
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import bootstrap from '@/boot';

import Home from '@/pages/Home';
import Enemies from '@/pages/Enemies/';
import Enemy from '@/pages/Enemy';
import '@/assets/css/reset.css';

/******************************************************************************
 * App
 *****************************************************************************/
class App extends React.Component {
  constructor(props:any) {
    super(props);
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/enemy" component={Enemies} />
            <Route exact path="/enemy/:id" component={Enemy} />
          </Switch>
        </Router>
      </div>
    );
  }
}

bootstrap();
ReactDOM.render(<App />, document.getElementById("app"));