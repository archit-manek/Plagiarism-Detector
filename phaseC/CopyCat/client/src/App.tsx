import * as React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Info from './components/Info';
import Create from './components/instructor/Create';
import Login from './components/instructor/Login';
import Profile from './components/instructor/Profile';

export default class App extends React.Component {
  public render() {
    return (
      <div>
        <Switch>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/home'} exact component={Home} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/login'} exact component={Login} />
          <Route path={'/info'} exact component={Info} />
          <Route path={'/profile/:email/:fname/:lname'} exact component={Profile} />
        </Switch>
      </div>
    );
  }
}
