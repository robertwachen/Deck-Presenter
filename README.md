## Deck Presenter
Deck Presenter allows users to host custom video chat meeting rooms for free and present slideshows ("decks"). Deck Presenter uses node.js to run a node server, PeerJS to run a PeerServer, Okta for authentication and registration services, and WebRTC and Socket.io for video chatting.

## Motivation
Deck Presenter was created out of frustration during mutli-person presentations using conventional video-chatting applications, where one presenter would share their screen with the slide deck, leaving the other presenters unable to read speaker notes and see previous and upcoming slides.

## Demonstration
[![](http://img.youtube.com/vi/jQhLaemeP-A/0.jpg)](http://www.youtube.com/watch?v=jQhLaemeP-A "")
[Click here to view the demonstration video](https://www.youtube.com/watch?v=jQhLaemeP-A)

## Usage
<b>To run Deck Presenter locally, please follow these steps:</b>
1. Download the entire Deck Presenter app
2. Declare dependencies and install modules listed in package.json
3. Execute "npm run deckPresenter" to run the Node server
4. In a separate terminal, execute "peerjs --port 8081" to run the PeerServer
5. Go to localhost:8080/ in browser and enjoy!

If you are receiving CORS errors, this means that you may have to create your own Okta web app and connect your developer details to this app in auth.js. Additionally, some of the JavaScript functions and cookie attributes required for this web app to run locally are browser and device dependent. I recommend running Deck Presenter on Firefox on Windows.

## Tech and Frameworks used
<b>Built with</b>
- JavaScript
- Node.js
- Express
- PeerJS
- EJS / HTML / CSS
- Okta
- WebRTC
- Socket.io

## Like Deck Presenter?
Feel free to express appreciation and motivate similar future projects [here.](https://paypal.me/robertwachen)

© [Robert Wachen](https://github.com/robertwachen/)