

const url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
const options = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/graphql'
  },
  body: '{bikeRentalStations {stationId name bikesAvailable spacesAvailable lat lon allowDropoff}}'
}


export const fetchStationsData = () => {
  return fetch(url, options);
}