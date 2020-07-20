import  request from 'postman-request'
export const geocode = (address, callback) => {
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoieWFzbWluOTgiLCJhIjoiY2tjaGw4YmR5MTJ6MjJ6cGJmNmxkajYzYyJ9.vVe3zaPBHZ5HBwFUqPG6Ww`;

  request({ url, json: true }, (error,{body}) => {
      if(error){
          callback('Unable to connect to location services',undefined)
      }else if(body.feature && body.feature.length == 0){
          callback('Unable to find location try another search',undefined);
      }else{
          callback(undefined,{
              latitude:body.features[0].center[1],
              longitude:body.features[0].center[0],
              location: body.features[0].place_name
          })
      }
  });
};
