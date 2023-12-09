const express = require('express')
const dataParserRoom1 = require('./dataParsers/room1')
const dataParserRoom2 = require('./dataParsers/room2')
const dataParserRoom3 = require('./dataParsers/room3')
const append = require('./append')

const app = express()
const port = 3000

app.use(express.json())

app.post('/read', (req, res) => {
    append(dataParserRoom1(req.body), 1)
    append(dataParserRoom2(req.body), 2)
    append(dataParserRoom3(req.body), 3)
    res.send({
        message: req.body.roomNum == 0? 'Data appended as outdoor in every room' : 'Data appended as indoor in room: ' + req.body.roomNum
    })
})


app.listen(port, () => {
    console.log("Rawan is running on port: " + port)
})

