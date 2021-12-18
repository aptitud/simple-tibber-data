const { TibberFeed, IConfig} = require('tibber-api');
const influxWriter = require('./influx')
const { tibber } = require('./config')

// Config object needed when instantiating TibberQuery
const config: typeof IConfig = {
    // Endpoint configuration.
    active:true,
    apiEndpoint: {
        apiKey: tibber.api_key,
        feedUrl: 'wss://api.tibber.com/v1-beta/gql/subscriptions',
        queryUrl: 'https://api.tibber.com/v1-beta/gql',
    },
    // Query configuration.
    homeId: tibber.home_id,
    timestamp: true,
    power: true,
    powerProduction: true,
    currentL1: true,
    currentL2: true,
    currentL3: true,

};

// Instantiate TibberFeed.
const tibberFeed = new TibberFeed(config);

// Subscribe to "data" event.
tibberFeed.on('data', data => {
    console.log(data);
    const {currentL1, currentL2, currentL3, power, powerProduction} = data
    influxWriter.store({
        currentL1, currentL2, currentL3, power, powerProduction
    })
});

tibberFeed.on('error', error => {
    console.log(`TibberFeed Error -> : ${error}`);
});

tibberFeed.on('log', message => {
    console.log(`log -> : ${message}`);
})

tibberFeed.on('disconnected', message => {
    console.log(`Disconnected event received : ${message}`);
    process.exit(-1);
})

// Connect to Tibber data feed
tibberFeed.connect();

const closeFeed = () => {
    tibberFeed.close();
}

process.on('SIGUSR2', () => {
    closeFeed();
})

process.on('SIGINT', () => {
    closeFeed();
})

process.on('SIGTERM', () => {
    closeFeed();
})

