import {fetchStationsData} from "../services/stationsService"

const initialState = {
  stations: {
    data: [],
    loading: false,
    error: null,
    favorites: [],
  },
}

const STATIONS_REQUEST = 'STATIONS_REQUEST';
const stationsRequest = () => ({
  type: STATIONS_REQUEST,
});

const STATIONS_RESPONSE_SUCCESS = 'STATIONS_RESPONSE_SUCCESS';
const stationsResponseSuccess = ({payload}) => ({
  type: STATIONS_RESPONSE_SUCCESS,
  payload,
});

const STATIONS_RESPONSE_ERROR = 'STATIONS_RESPONSE_ERROR';
const stationsResponseError = ({error}) => ({
  type: STATIONS_RESPONSE_ERROR,
  error,
});

const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const toggleFavorite = ({stationId}) => ({
  type: TOGGLE_FAVORITE,
  stationId,
});

export const fetchStations = () => async dispatch => {
  dispatch(stationsRequest());
  try {
    const stationsData = await fetchStationsData();
    return dispatch(stationsResponseSuccess({payload: stationsData}))
  } catch(err) {
    return dispatch(stationsResponseError({error: err}))
  }
}

export const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATIONS_REQUEST:
      return {
        ...state,
        stations: {
          ...state.stations,
          loading: true,
        },
      }
    case STATIONS_RESPONSE_SUCCESS:
      return {
        ...state,
        stations: {
          ...state.stations,
          loading: false,
          data: action.payload,
        },
      }
    case STATIONS_RESPONSE_ERROR:
      return {
        ...state,
        stations: {
          ...state.stations,
          loading: false,
          error: action.error,
        },
      }
    case TOGGLE_FAVORITE:
      return {
        ...state,
        stations: {
          ...state.stations,
          favorites: state.stations.favorites.includes(action.stationId)
            ? state.stations.favorites.filter(id => id !== action.stationId)
            : [...state.stations.favorites, action.stationId],
        }
      }
    default:
      return state;
  }
}