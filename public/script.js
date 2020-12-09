// Initializes Socket (Socket.io) and myPeer (PeerJS Server)
const socket = io('/')
const myPeer = new Peer(undefined, {host: '/', port:'8081'})

// Initializes myVideo element to add to videoGrid
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')
myVideo.muted = true

// Keeps track of people in room
const peers = {}

// Gets video and audio and then executes promise
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {

  /* When connecting to new user, send them your video stream,
     and add their video to your video stream */
   myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')

    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  /* When new user is connected (triggered by broadcast from server)
     all sockets in room connect to that new user */
  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })

  // Adds user's video to call
  addVideoStream(myVideo, stream)

  // Tells server to join the room and video is ready
  socket.emit('join-room', ROOM_ID, myPeer.id)
})

// Remove disconnected users from call
socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

/* When connecting to new user, send them your video stream,
   and add their video to your video stream */
function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')

  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })

  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

// Append and display new video stream to videoGrid
function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

// Tell the server when someone has uploaded a new presentation
var form = document.getElementById('upload-form')
form.addEventListener('change', e => {
  e.preventDefault()
  const src = document.getElementById('presentation').src
  socket.emit('file-upload', src)
})

/* Change the presentation for everyone when someone uploads
   a new presentation */
socket.on('new-presentation', (src) => {
  document.getElementById('presentation').src = src;
})