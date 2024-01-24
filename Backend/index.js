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
  
    console.log(req.body)
    // const room1Data = dataParserRoom1(req.body); 
    const room2Data = dataParserRoom2(req.body); 
    // const room3Data = dataParserRoom3(req.body); 
    // const outData = dataParserOut(req.body); 
    
    // append(room1Data, 1);
    append(room2Data, 2); 
    // append(room3Data, 3); 
    // append(outData, 0);
    res.send('Data received and processed successfully.');
  
    
  });
  


app.listen(port, () => {
    console.log("Rawan is running on port: " + port)
})

