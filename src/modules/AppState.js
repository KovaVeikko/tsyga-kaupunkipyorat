import {fetchStationsData} from "../services/stationsService"

const initialState = {
  stations: {
    data: null,
    loading: false,
    error: null,
  }
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

export const fetchStations = () => dispatch => {
  dispatch(stationsRequest());
  fetchStationsData()
    .then(response => {
      if (response.status !== 200) {
        return dispatch(stationsResponseError({error: response.statusText}))
      } else {
        response.json()
          .then(json => {
          return dispatch(stationsResponseSuccess({payload: json.data}))
        })
          .catch(error => {
            return dispatch(stationsResponseError({error}))
        })
      }
    })
    .catch(error => {
      return dispatch(stationsResponseError({error}))
    })
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
    default:
      return state;
  }
}