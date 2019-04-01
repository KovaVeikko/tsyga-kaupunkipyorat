

const url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
const options = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/graphql'
  },
  body: '{bikeRentalStations {stationId name bikesAvailable spacesAvailable lat lon allowDropoff}}'
}


export const fetchStationsData = () => new Promise((resolve, reject) => {
  return fetch(url, options)
    .then(response => {
      if (response.status !== 200) {
        reject(response.statusText)
      } else {
      response.json()
        .then(json => {
          const stations = json.data.bikeRentalStations;
          if (stations && stations.length) {
            // TODO: show disabled stations with a different icon on the map
            const notDisabledStations = stations.filter(f => (f.bikesAvailable && f.spacesAvailable) && (f.bikesAvailable > 0 || f.spacesAvailable > 0));
            resolve(notDisabledStations);
          } else {
            reject(new Error("Unexpected format, of type: " + typeof stations));
          }
        })
        .catch(error => {
          reject(error)
        })
      }
    })
  .catch(error => {
    reject(error)
  })
})
