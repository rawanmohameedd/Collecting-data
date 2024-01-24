function dataParserRoom2(data) {
    // if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    //     console.error('Invalid or empty data received:', data);
    //     return null;
    // }

    const parsedData = {
      '10:10:81:ad:c4:92': data.data['10:10:81:ad:c4:92'] || null,
      '24:d3:f2:a7:b3:cd': data.data['24:d3:f2:a7:b3:cd'] || null,
      '44:fb:5a:d2:d0:61': data.data['44:fb:5a:d2:d0:61'] || null,
      '58:ba:d4:9b:b3:36': data.data['58:ba:d4:9b:b3:36'] || null,
      '9c:d6:43:cb:23:c0': data.data['9c:d6:43:cb:23:c0'] || null,
      'b0:89:00:74:7c:7d': data.data['b0:89:00:74:7c:7d'] || null,
      'b4:74:9f:ba:83:2c': data.data['b4:74:9f:ba:83:2c'] || null,
      'd4:6b:a6:c4:28:00': data.data['d4:6b:a6:c4:28:00'] || null,
      'f4:e3:fb:90:3a:a8': data.data['f4:e3:fb:90:3a:a8'] || null,
      indoor: data.indoor || null,
      magnetometerSensor: data.magnetometerSensor || null,
      roomNum: data.roomNum || null,
  };
  return parsedData;}

  

module.exports = dataParserRoom2;
