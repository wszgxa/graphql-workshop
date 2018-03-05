import React, { Component } from 'react';
import Header from './common/Header'
import PostList from './posts/PostList'
import Login from './login/Login'
import { Switch, Route } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <Switch>
          <Route exact path='/' component={PostList}/>
          <Route exact path='/login' component={Login}/>          
        </Switch>
      </div>
    );
  }
}

export default App;