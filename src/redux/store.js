import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {navigationReduxMiddleware} from "../modules/navigator/NavigatorHelpers";
import reducer from './reducer';


let middleWares = [
  thunkMiddleware,
  navigationReduxMiddleware,
];

if (__DEV__) {
  const loggerMiddleware = createLogger();
  middleWares = [...middleWares, loggerMiddleware];
}

const store = createStore(
  reducer,
  applyMiddleware(...middleWares),
);

export default store;