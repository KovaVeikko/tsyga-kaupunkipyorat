import AppNavigator from './Navigator';

const NavigatorReducer = (state, action) => {
  return AppNavigator.router.getStateForAction(action, state);
};

export default NavigatorReducer;