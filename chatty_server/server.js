const express = require('express');
const SocketServer = require('ws');
const PORT = 3001;

// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

wss.broadcast = function broadcast(msg) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === SocketServer.OPEN) {
            client.send(msg);
        }
    });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on("message", (msg) => {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === 1) {
                client.send(msg);
                }
            });
        console.log(msg)
    })
    ws.send("message send")

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));
});
