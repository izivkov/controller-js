import { Connection } from './connection.js'
import { Keyboard } from './keyboard.js'

(async () => {
    const connection = new Connection()
    const keyboard = new Keyboard ()

    const onData = data => {
        console.log(`Got data from server [${data}]`)
    }

    await connection.start(onData)

    const onKeyPress = (key) => {
        // Send keypress to server
        connection.send(JSON.stringify({ KEYPRESS: key }))
    }

    keyboard.start(onKeyPress)
})()


