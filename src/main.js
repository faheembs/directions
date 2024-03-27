// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, { useEffect } from 'react';
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
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./utils/ProtectedRoute";


const history = syncHistoryWithStore(browserHistory, store);

const appRoute = buildAppRoutes(App);

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router history={history}>
          <Route path="/login" component={() => (<ProtectedRoute><Login /></ProtectedRoute>)} exact />
          <Route path="/register" component={Signup} />
          <Route path="/dashboard" component={() => (<ProtectedRoute><Dashboard /></ProtectedRoute>)} />
          <ProtectedRoute path="/dashboard/profile" component={() => (<ProtectedRoute><Profile /></ProtectedRoute>)} />
          <ProtectedRoute path="/dashboard/datasets" component={() => (<ProtectedRoute><DataTable /></ProtectedRoute>)} />
          <ProtectedRoute path="/dashboard/users" component={() => (<ProtectedRoute><DataTable /></ProtectedRoute>)} />
          <Redirect from="/" to={"/login"} />
          {/* <Route path="/directions" component={() => (<ProtectedRoute><App /></ProtectedRoute>)}> */}
          <Route path="/directions" component={App}>
            {appRoute}
          </Route>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Root />
);