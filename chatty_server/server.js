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
    ws.on("message", (msg) => {
        data = JSON.parse(msg);
        if(data.type === 'postMessage') {
            data.type = 'incomingMessage'
        }
        if(data.type === 'postNotification'){
            data.type = 'incomingNotification';
        }
        console.log("This is a thing", data)    
         
        data = JSON.stringify(data);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === 1) {
                console.log("Im sendng...")
                client.send(data);
                }
            });
    })

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));
});
