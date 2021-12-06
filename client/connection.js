/*
 * Developed for the OpenBot project (https://openbot.org) by:
 *
 * Ivo Zivkov
 * izivkov@gmail.com
 *
 * Date: Mon Nov 29 2021
 */

export class Connection {

    constructor () {
    }

    async connectToServer() {
        // const ws = new WebSocket('ws://localhost:7071/ws');
        const ws = new WebSocket('ws://0.0.0.0:7071/ws');
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                if (ws.readyState === 1) {
                    clearInterval(timer);
                    resolve(ws);
                }
            }, 10);
        });
    }

    async start (onData) {
        const ws = await this.connectToServer ()
        
        ws.onmessage = (webSocketMessage) => {
            onData(webSocketMessage.data)
        };   

        this.send = data => ws.send(data)
    }
}
