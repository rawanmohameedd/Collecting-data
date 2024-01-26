function dataParserRoom1(data) {
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
        console.error('Invalid or empty data received:', data);
        return null;
    }

    const parsedData = {
        '24:d3:f2:a7:b3:cd': data.data['24:d3:f2:a7:b3:cd'] || null,
        'b4:74:9f:ba:83:34': data.data['b4:74:9f:ba:83:34'] || null,
        'b0:89:00:74:7c:84': data.data['b0:89:00:74:7c:84'] || null,
        '9c:d6:43:cb:23:c0': data.data['9c:d6:43:cb:23:c0'] || null,
        '30:99:35:90:32:9f': data.data['30:99:35:90:32:9f'] || null,
        '44:fb:5a:d2:d0:61': data.data['44:fb:5a:d2:d0:61'] || null,
        'd8:0d:17:db:be:92': data.data['d8:0d:17:db:be:92'] || null,
        '10:10:81:ad:c4:92': data.data['10:10:81:ad:c4:92'] || null,
        'f4:e3:fb:90:3a:a8': data.data['f4:e3:fb:90:3a:a8'] || null,
        indoor: data.indoor ,
        roomNum: data.roomNum || null,
    };

    return parsedData;
}

module.exports = dataParserRoom1;
