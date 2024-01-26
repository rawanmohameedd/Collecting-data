const ObjectsToCsv = require('objects-to-csv');

async function objectToRow(data,roomNumber) {4
 console.log(data)
  if (data) {
      const csv = new ObjectsToCsv([data]);
      const roomFilePath = `./data/room${roomNumber}.csv`;
      const outFilePath = './data/out.csv';
  
      await csv.toDisk(roomFilePath, { append: true });
      await csv.toDisk(outFilePath, { append: true });
    } else {
      //console.error('Invalid or empty data received:', data);
    }
  }
  async function append(dataObj, roomNumber) {
    await objectToRow(dataObj, roomNumber)
}
  module.exports = append;
