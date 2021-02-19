const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
const http = require('http').Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ["GET", "POST"],
        credentials: true
    },
    allowEIO3: true
});
app.use(express.urlencoded({ extended: true }))
app.use('/', router)


const server = http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

let message= []

let users=[] 
let i = 0
// let winner = false
io.on('connection', (socket) => {
    console.log('a user connected');
    if (users.length>0){
        socket.emit('setUserFromServer',users)
    }
    socket.on("newMessage", (data) => {
      // socket.emit("serverMessage", data)
      let {text, title, user} = data
      console.log(data)
      if (title.toLowerCase() === text.toLowerCase()) {
        users.forEach(el => {
          if (el.name === user && el.score < 11) {
            el.score++
          }
        })
      }
      io.emit('sentToUser', users)
    })
    socket.on('score', () => {
      let userwin = ''
      let max = 0
      users.forEach(el => {
        if (el.score > max) {
          max = el.score
          userwin = el.name
        }
      })
      let result = {
        name: userwin,
        score: max
      }
      io.emit('winner', result)
    })
    socket.on('restart', () => {
      message= []
      users=[] 
      i = 0
      io.emit('restartGame')
    })
    socket.on('startGame', () => {
      io.emit('startTimer')
      io.emit('fetchSongData')
    })
    socket.on('inputUser', (dataUser) => {
        console.log(dataUser,'<<<user from client')
        if (i<= 5) {
            let obj = {
                name: dataUser,
                score: 0
            }
            users.push(obj)
            i++
            io.emit('sentToUser',users)
        }
    })
    socket.on('disconnect', function(msg){
        user=[]
        console.log("User Disconnected");
    })

});
// app.use(errorHandler)
// app.listen(port, () => {
//     console.log('app is running in port: ', port)
// })