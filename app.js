const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const port = process.env.PORT || 3000
// app.use(cors())
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

const message= []

const users=[]
let i = 0

io.on('connection', (socket) => {
    console.log('a user connected');
    if (users.length>0){
        socket.emit('setUserFromServer',users)
    }
    socket.on("newMessage", (data) => {
        socket.emit("serverMessage", data)
        console.log(data)
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