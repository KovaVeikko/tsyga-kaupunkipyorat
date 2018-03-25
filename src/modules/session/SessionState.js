
const initialState = {
  isReady: false,
}

export const LOAD_SNAPSHOT = 'LOAD_SNAPSHOT';
export const loadSnapshot = (snapshot) => ({
  type: LOAD_SNAPSHOT,
  snapshot
});

export const SessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SNAPSHOT:
      return {
        ...state,
        isReady: true,
      }
    default:
      return state;
  }
}