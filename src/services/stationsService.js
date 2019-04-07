

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
            resolve(stations);
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
