import {createReactNavigationReduxMiddleware, createReduxBoundAddListener} from "react-navigation-redux-helpers";

export const navigationReduxMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navigator,
);

export const addNavigationListener = createReduxBoundAddListener("root");