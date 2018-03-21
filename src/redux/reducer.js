import {combineReducers} from 'redux';
import NavigatorReducer from '../modules/navigator/NavigatorState';
import {AppReducer} from "../modules/AppState"

export default combineReducers({
  navigator: NavigatorReducer,
  app: AppReducer,
})