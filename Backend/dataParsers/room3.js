function dataParserRoom3(data) {
    if (!data || !data.data || !Array.isArray(data.data) || data.data.length < 1) {
        console.error('Invalid or empty data received:', data);
        return null; 
    }
    const parsedData = {

        BSSID1: data.data[0]? data.data[0].BSSID : undefined,
        BSSID2: data.data[1]? data.data[1].BSSID : undefined,
        BSSID3: data.data[2]? data.data[2].BSSID : undefined,
        BSSID4: data.data[3]? data.data[3].BSSID : undefined,
        BSSID5: data.data[4]? data.data[4].BSSID : undefined,

        RSSI1: data.data[0]? data.data[0].level : undefined,
        RSSI2: data.data[1]? data.data[1].level : undefined,
        RSSI3: data.data[2]? data.data[2].level : undefined,
        RSSI4: data.data[3]? data.data[3].level : undefined,
        RSSI5: data.data[4]? data.data[4].level : undefined,

        Frequency1: data.data[0]? data.data[0].frequency : undefined,
        Frequency2: data.data[1]? data.data[1].frequency : undefined,
        Frequency3: data.data[2]? data.data[2].frequency : undefined,
        Frequency4: data.data[3]? data.data[3].frequency : undefined,
        Frequency5: data.data[4]? data.data[4].frequency : undefined,
    
    
        accelerometer: data.accelerometerSensor,
        magnetometer: data.magnetometerSensor,

        location: data.roomNum == 3? 'indoor' : 'outdoor'
        
    }
    return parsedData
}

module.exports = dataParserRoom3
