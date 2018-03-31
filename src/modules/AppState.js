import {fetchStationsData} from "../services/stationsService"
import {getPosition} from "../services/locationService"

const initialState = {
  stations: {
    data: [],
    loading: false,
    error: null,
    favorites: [],
    sorted: false,
  },
  location: {
    position: {
      coords: {
        latitude: 60.192059,
        longitude: 24.945831,
      }
    },
    loading: false,
    error: null,
  }
}

const STATIONS_REQUEST = 'STATIONS_REQUEST';
export const stationsRequest = () => ({
  type: STATIONS_REQUEST,
});

const STATIONS_RESPONSE_SUCCESS = 'STATIONS_RESPONSE_SUCCESS';
export const stationsResponseSuccess = ({payload}) => ({
  type: STATIONS_RESPONSE_SUCCESS,
  payload,
});

const STATIONS_RESPONSE_ERROR = 'STATIONS_RESPONSE_ERROR';
export const stationsResponseError = ({error}) => ({
  type: STATIONS_RESPONSE_ERROR,
  error,
});

const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const toggleFavorite = ({stationId}) => ({
  type: TOGGLE_FAVORITE,
  stationId,
});

const TOGGLE_SORTED = 'TOGGLE_SORTED';
export const toggleSorted = () => ({
  type: TOGGLE_SORTED,
});

const LOCATION_REQUEST = 'LOCATION_REQUEST';
const locationRequest = () => ({
  type: LOCATION_REQUEST,
});

const LOCATION_RESPONSE_SUCCESS = 'LOCATION_RESPONSE_SUCCESS';
const locationResponseSuccess = ({payload}) => ({
  type: LOCATION_RESPONSE_SUCCESS,
  payload,
});

const LOCATION_RESPONSE_ERROR = 'LOCATION_RESPONSE_ERROR';
const locationResponseError = ({error}) => ({
  type: LOCATION_RESPONSE_ERROR,
  error,
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

export const getLocation = () => async dispatch => {
  dispatch(locationRequest());
  try {
    const position = await getPosition();
    return dispatch(locationResponseSuccess({payload: position}));
  } catch (err) {
    return dispatch(locationResponseError({error: err}));
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
          error: null,
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
    case TOGGLE_SORTED:
      return {
        ...state,
        stations: {
          ...state.stations,
          sorted: !state.stations.sorted,
        }
      }
    case LOCATION_REQUEST:
      return {
        ...state,
        location: {
          ...state.location,
          loading: true,
        }
      }
    case LOCATION_RESPONSE_SUCCESS:
      return {
        ...state,
        location: {
          ...state.location,
          loading: false,
          position: action.payload,
          error: null,
        }
      }
    case LOCATION_RESPONSE_ERROR:
      return {
        ...state,
        location: {
          ...state.location,
          loading: false,
          error: action.error,
        }
      }
    default:
      return state;
  }
}