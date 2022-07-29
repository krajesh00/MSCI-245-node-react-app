import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Search from '../Search';
import Landing from '../Landing';
import Home from '../Home'
import MyPage from '../MyPage'
import history from './history';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/Reviews" exact component={Home} />
      <Route path="/" exact component={Landing} />
      <Route path="/MyPage" exact component={MyPage} />
      <Route path="/Search" exact component={Search} />
      </Switch>
    </Router>
  );
}