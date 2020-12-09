## Structure
Deck Presenter runs an express server and a PeerServer simultaneously, allowing client-server communcation for video chat and file sharing. The main is executed in server.js, which redirects users to rooms and references the two views: welcome.ejs and room.ejs. 

welcome.ejs calls handleLogin(); a function from auth.js which creates the Okta login container and handles the entire login. After this is completed, server.js will redirect the user to their unique room, created with room.ejs.

At this point, socket.io is used to establish a connection between server.js and script.js, which connects to the PeerServer running on port 8081. server.js and script.js communicate with each other to facilitate video chatting and file sharing.

## Flow
<b>Setup</b>
npm run deckPresenter
peerjs --port 8081

Node server and PeerJS server are now ready.

<b>Before Login:</b>
server.js renders welcome.ejs
welcome.ejs calls handleLogin(); from auth.js
auth.js renders Okta login container and awaits user login

<b>After Login:</b>
server.js redirects user to unique room
server.js renders room.ejs
room.ejs calls script.js and connects to PeerServer
server.js and script.js connect via socket.io
User is now connected to room and their video is displayed
User can share their unique meeting room to other users

<b>After another user joins the room:</b>
server.js and script.js establish connections
server.js tells every user to connect to that user
script.js finished this connection and displays video chat

<b>After a user presents a file:</b>
script.js tells server.js there has been a local file change
server.js tells every user to update their iframe in room.ejs with that file

## Like Deck Presenter?
Feel free to express appreciation and motivate similar future projects [here.](https://paypal.me/robertwachen)

© [Robert Wachen]()