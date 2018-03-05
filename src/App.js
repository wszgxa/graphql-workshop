import React, { Component } from 'react';
import Header from './common/Header'
import PostList from './posts/PostList'
import CreatePost from './posts/CreatePost'
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
          <Route exact path='/create' component={CreatePost}/>          
        </Switch>
      </div>
    );
  }
}

export default App;