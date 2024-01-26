const express = require('express')
const dataParserRoom1 = require('./dataParsers/room1')
const dataParserRoom2 = require('./dataParsers/room2')
const dataParserRoom3 = require('./dataParsers/room3')
const dataParserOut = require('./dataParsers/out')
const append = require('./append')

const app = express()
const port = 3000

app.use(express.json())


app.post('/read', (req, res) => {
  const { dataWithRoomnum } = req.body;

  if (!dataWithRoomnum) {
    console.error('Invalid or empty data received:', dataWithRoomnum);
    return res.status(400).send('Invalid data received.');
  }

  const { roomNum } = dataWithRoomnum;

  let roomData;
  if (roomNum === 1) {
    roomData = dataParserRoom1(dataWithRoomnum);
  } else if (roomNum === 2) {
    roomData = dataParserRoom2(dataWithRoomnum);
  } else if (roomNum === 3) {
    roomData = dataParserRoom3(dataWithRoomnum);
  } else if (roomNum === 0) {
    roomData = dataParserOut(dataWithRoomnum);
  } else {
    console.log('Invalid roomNum:', roomNum);
    return res.status(400).send('Invalid roomNum.');
  }

  append(roomData, roomNum);

  res.json('Data received and processed successfully.');
});



app.listen(port, () => {
    console.log("Rawan is running on port: " + port)
})

