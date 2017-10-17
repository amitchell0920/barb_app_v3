import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import Feature from './feature';
import RequireAuth from './auth/require_auth';
import Homepage from './homepage';
import Dashboard from './dashboard';
import '../index.css';
import Appointment from './appointment';
import Profile from './profile';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Homepage} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/signout' component={Signout} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/appointment' component={Appointment} />
          <Route path='/profile' component={Profile} />
          <Route path='/feature' component={RequireAuth(Feature)} />
        </div>
      </Router>
    );
  }
};
