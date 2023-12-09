const objectsToCsv = require('objects-to-csv')

async function objectToRow(data, roomNumber) {
    const csv = new objectsToCsv([data]);
    await csv.toDisk(`./data/room${roomNumber}.csv`, {
        append: true
    });
}

async function append(dataObj, roomNumber) {
    await objectToRow(dataObj, roomNumber)
}

module.exports = append