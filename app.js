const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const port = process.env.PORT || 3000
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors:{
        origin:"http://localhost:8081",
        method:["GET", "POST"],
        credentials:true,
    },
    allowEIO3: true
});

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

io.on('connection', (socket) => {
    console.log('a user connected');
});
// app.use(errorHandler)

app.listen(port, () => {
    console.log('app is running in port: ', port)
})