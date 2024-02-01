import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { enhanceReduxMiddleware } from '@kepler.gl/reducers';
import demoReducer from './reducers/index';
import authReducer from "./features/Authentication/AuthSlice";
import datasetReducer from "./features/Dataset/DatasetSlice";
import thunk from 'redux-thunk';
import usersReducer from './features/Users/usersSlice';
// eslint-disable-next-line no-unused-vars

const reducers = {
  demo: demoReducer,
  routing: routerReducer,
  auth: authReducer,
  dataset: datasetReducer,
  users: usersReducer,
};

export const middlewares = enhanceReduxMiddleware([thunk, routerMiddleware(browserHistory)]);

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
