module.exports = {
    tibber: {
        home_id: process.env.TIBBER_HOME,
        api_key: process.env.TIBBER_KEY 
    },
    influx : {
        url: 'https://europe-west1-1.gcp.cloud2.influxdata.com',
        token: process.env.INFLUX_TOKEN,
        org: 'johan.elmstrom@aptitud.se',
        bucket: `tibber_data`
    }  
}