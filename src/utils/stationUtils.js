import {getDistanceFromLatLonInKm} from "./locationUtils"

export const STATION_EMPTY = 'EMPTY';
export const STATION_OK = 'OK';
export const STATION_FULL = 'FULL';
export const STATION_DISABLED = 'DISABLED';

export const getStationStatus = (station) => {
  if (station.spacesAvailable === 0 && station.bikesAvailable === 0) {
    return STATION_DISABLED;
  }
  if (station.bikesAvailable === 0) {
    return STATION_EMPTY;
  }
  if (station.spacesAvailable === 0) {
    return STATION_FULL;
  }
  return STATION_OK;
}

export const isFavorite = (favorites, station) => favorites.includes(station.stationId);

export const getStationDistance = (coords, station) => {
  return getDistanceFromLatLonInKm(coords.latitude, coords.longitude, station.lat, station.lon);
}

export const sortStationsByDistance = (coords, stationsList) => {
  return stationsList.sort((left, right) => {
    return getStationDistance(coords, left) > getStationDistance(coords, right) ? 1 : -1;
  });
}

export const sortStationsByName = (stationsList) => {
  return stationsList.sort((left, right) => {
    return left.name > right.name ? 1 : -1;
  });
}
