import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {navigationReduxMiddleware} from "../modules/navigator/NavigatorHelpers";
import reducer from './reducer';


let middleWares = [
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