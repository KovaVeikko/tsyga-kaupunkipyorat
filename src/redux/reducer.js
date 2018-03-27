import {combineReducers} from 'redux';
import NavigatorReducer from '../modules/navigator/NavigatorState';
import {AppReducer} from "../modules/AppState"
import {LOAD_SNAPSHOT, SessionReducer} from "../modules/session/SessionState"

const rootReducer = combineReducers({
  navigator: NavigatorReducer,
  app: AppReducer,
  session: SessionReducer,
})

export default reducer = (state, action) => {
  return action.type === LOAD_SNAPSHOT && action.snapshot
    ? rootReducer(action.snapshot, action)
    : rootReducer(state || void 0, action);
}