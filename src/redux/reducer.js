import {combineReducers} from 'redux';
import NavigatorReducer from '../modules/navigator/NavigatorState';

export default combineReducers({
  navigator: NavigatorReducer,
})