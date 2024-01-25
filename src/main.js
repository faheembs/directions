// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React from 'react';
import ReactDOM from 'react-dom/client';
import document from 'global/document';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import App from './app';
import { buildAppRoutes } from './utils/routes';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Dashboard/profile/Profile';
import DataTable from './components/DataTables/DataTable';

const history = syncHistoryWithStore(browserHistory, store);

const appRoute = buildAppRoutes(App);

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <Route path="/login" component={Login} exact />
        <Redirect from="/" to="/login" />
        <Route path="/register" component={Signup} />
        <Route path="/dashboard" component={Dashboard}>
          <Route path="/dashboard/profile" component={Profile} />
          <Route path="/dashboard/datasets" component={DataTable} />
          <Route path="/dashboard/users" component={DataTable} />
        </Route>
        <Route path="/directions" component={App} >
          {appRoute}
        </Route>
      </Router>
    </BrowserRouter>
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Root />
);