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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');
    userCount = {
        type: "userCount",
        count: wss.clients.size
    }
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(userCount));
    })

    ws.on("message", (data) => {
        data = JSON.parse(data);
        if(data.type === 'postMessage') {
            data.type = 'incomingMessage'
        }
        if(data.type === 'postNotification'){
            data.type = 'incomingNotification';
        }   
        
        data = JSON.stringify(data);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === 1) {
                client.send(data);
                }
            });
    })

    // Set up a callback for when a client closes the socket.
    ws.on('close', () => {
        userCount = {
            type: "userCount",
            count: wss.clients.size
        }
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(userCount));
        })
        console.log('Client disconnected');
    })
})
