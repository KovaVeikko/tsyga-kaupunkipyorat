const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 60000
};

export const getPosition = () => new Promise((resolve, reject) => {
  return navigator.geolocation.getCurrentPosition(
    position => {
      resolve(position);
    },
    error => {
      reject(error);
    },
    options
  )
});