import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { enhanceReduxMiddleware } from '@kepler.gl/reducers';
import demoReducer from './reducers/index';
import authReducer from "./features/Authentication/AuthSlice";
import thunk from 'redux-thunk';
// eslint-disable-next-line no-unused-vars

const reducers = {
  demo: demoReducer,
  auth: authReducer,
  routing: routerReducer,
};

export const middlewares = enhanceReduxMiddleware([thunk, routerMiddleware(browserHistory)]);

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
