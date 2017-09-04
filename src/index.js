import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
  // Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'

// Containers
import Login from './views/Login/Login'
import App from './containers/App/App'

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route path="/login" name="Login" component={Login}/>
      <Route path="/" name="App" component={App}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'));
