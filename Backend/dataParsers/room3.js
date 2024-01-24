function dataParserRoom3(data) {
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
        console.error('Invalid or empty data received:', data);
        return null;
    }

    const parsedData = {};

    // Iterate over the data object and populate parsedData dynamically
    for (const key in data.data) {
      parsedData[key] = data.data[key] || null;
    }
  
    // Add other properties to parsedData
    parsedData.indoor = data.indoor || null;
    parsedData.magnetometerSensor = data.magnetometerSensor || null;
    parsedData.roomNum = data.roomNum || null;
  
    return parsedData;
  }

module.exports = dataParserRoom3;
