const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

app.post('/room1', (req, res) => {
    console.log(req.body)
})

app.post('/room2', (req, res) => {

})

app.post('/room3', (req, res) => {

})

app.post('/out', (req, res) => {

})

app.listen(port, () => {
    console.log("Rawan is running on port: " + port)
})

