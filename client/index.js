/*
 * Developed for the OpenBot project (https://openbot.org) by:
 *
 * Ivo Zivkov
 * izivkov@gmail.com
 *
 * Date: Mon Nov 29 2021
 */

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


