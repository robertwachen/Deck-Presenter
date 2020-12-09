// Initalize express server and socket.io
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
var session = require('express-session')
const cookieParser = require("cookie-parser");

// Keep track of session cookies to keep/destroy them
app.use(cookieParser());
app.use(session({
  secret: "NZbJr6RD9pY5wirOcvtOU07n_J_EEDQwyAQVqORJ",
    name: "session_cookie",
    proxy: true,
    resave: true,
    saveUninitialized: true
}))

// Using ejs files to display views
app.set('view engine', 'ejs')
app.use(express.static('public'))

// Redirect user to welcome EJS
app.get('/', (req, res) => {
  res.render('welcome')
})

// When user logs in, they are redirected to their room
app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

/* 
On socket.io connection, server-side socket starts listening
for join-room, disconnect, and file-upload to communicate
with client-side sockets
*/
io.on('connection', socket => {

  // Broadcasts when new user connects
  socket.on('join-room', (roomId, userId) => {
    socket.broadcast.emit('user-connected', userId)

    // Broadcasts when users disconnect
    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', userId)
    })
  })

  // Broadcasts file uploads
  socket.on('file-upload', (src) => {
    socket.broadcast.emit('new-presentation', src)
  })

})

/*
When user logs out, redirect them to login
page and destroy their cookies
*/
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
});

server.listen(8080)