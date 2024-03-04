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
import { BrowserRouter, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Dashboard/profile/Profile';
import DataTable from './components/DataTables/DataTable';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./utils/ProtectedRoute";


// const ProtectedRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => {
//       console.log('Checking token:', localStorage.getItem('userToken'));
//       if (localStorage.getItem('userToken')) {
//         console.log('Token present. Rendering component.');
//         return <Component {...props} />;
//       } else {
//         console.log('Token not present. Redirecting to login.');
//         return <Redirect to="/login" />;
//       }
//     }}
//   />
// );

const history = syncHistoryWithStore(browserHistory, store);

const appRoute = buildAppRoutes(App);

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router history={history}>
          {/* <Switch> */}
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Signup} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/dashboard/profile" component={Profile} />
          <ProtectedRoute path="/dashboard/datasets" component={DataTable} />
          <ProtectedRoute path="/dashboard/users" component={DataTable} />
          <Redirect from="/" to={"/login"} />
          <ProtectedRoute path="/directions" component={App}>
            {appRoute}
          </ProtectedRoute>
          {/* </Switch> */}
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