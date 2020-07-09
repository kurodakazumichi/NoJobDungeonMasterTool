import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import Enemies from '@/pages/Enemies/';
import Enemy from '@/pages/Enemy';
import '@/assets/css/reset.css';

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




ReactDOM.render(<App />, document.getElementById("app"));