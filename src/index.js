import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import environment from './../config/Initialize';
// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss';

// Containers
import Login from './views/Login/Login';
import App from './containers/App/App';


const RouteConfig = () => (
    <HashRouter>
        <Switch>
            <Route path="/login"  render={routeProps => <Login {...routeProps} environment={environment}/>} />
            <Route path="/" render={routeProps => <App {...routeProps} environment={environment}/>} />
        </Switch>
    </HashRouter>
);

ReactDOM.render(<RouteConfig/>, document.getElementById('root'));
