/*
 * Developed for the OpenBot project (https://openbot.org) by:
 *
 * Ivo Zivkov
 * izivkov@gmail.com
 *
 * Date: Mon Nov 29 2021
 */

const WebSocket = require('ws');

class BrowserConnection {

    constructor(onData) {
    }

    start(onData) {

        const wss = new WebSocket.Server({ port: 7071 });
        wss.on('connection', (ws) => {
            this.ws = ws
            console.log('Connected to browser! 😃😃')
            ws.on('message', (messageAsString) => {
                onData(messageAsString)
            });

            this.send = data => ws.send (data)
        });
    }
}

module.exports = BrowserConnection
