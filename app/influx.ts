const  { InfluxDB, Point } =  require('@influxdata/influxdb-client')
const { influx } = require('./config')

// You can generate an API token from the "API Tokens Tab" in the UI
const token = influx.token
const org = influx.org
const bucket = influx.bucket

const client = new InfluxDB({url: influx.url, token: token})
const writeApi = client.getWriteApi(org, bucket)

const store = (data ):boolean => {
    try {
        writeApi.writePoint(new Point('L1').floatField('amp', data.currentL1));
        writeApi.writePoint(new Point('L2').floatField('amp', data.currentL2));
        writeApi.writePoint(new Point('L3').floatField('amp', data.currentL3));
        writeApi.writePoint(new Point('Power').floatField('power', data.power));
        writeApi.writePoint(new Point('Power').floatField('production', data.powerProduction));
        
    } catch (e) {
        console.log(e);
    }
    return true;
}

module.exports = {
    store
}




