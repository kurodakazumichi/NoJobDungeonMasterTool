import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { observable, computed, action  } from 'mobx';
import { observer } from 'mobx-react';
import '@/assets/css/reset.css';
import '@/assets/scss/styles.scss';
import window from '@/types/window';
class Store {
  @observable private _count = 0;

  @computed get count() {
    return this._count;
  }

  @action add() {
    this._count++;
  }

  @action sub() {
    this._count--;
  }
}
const store = new Store();

@observer
class Sample1 extends React.Component {
  render() {
    return (
      <div>
        count = {store.count}
        <Link to="/sample2">sample2へ</Link>
      </div>);
  }
}

@observer
class Sample2 extends React.Component {
  render() {
    return (
      <div>
        <button onClick={ () => {store.add();}}>Add</button>
        <button onClick={ () => {store.sub();}}>Sub</button>
        <Link to="/">Home</Link>
      </div>);
  }
}

class App extends React.Component {
  constructor(props:any) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>hello electron webpack</h1>
        <p>
          「{window.core.test()}」はpreloadによって設定されました。
          {__static}
        </p>
        <Router>
          <Switch>
            <Route exact path="/" component={Sample1} />
            <Route exact path="/sample2" component={Sample2} />
          </Switch>
        </Router>
      </div>
    );
  }
}




ReactDOM.render(<App />, document.getElementById("app"));