import { Connection } from './connection.js'
import { Keyboard } from './keyboard.js'

(async () => {
    const connection = new Connection()
    const keyboard = new Keyboard()

    const onData = data => {
        console.log(`Got data from server [${data}]`)
    }

    await connection.start(onData)

    const keyList = createKeyMenu(keyboard)

    const onKeyPress = (key) => {
        // handle only valid keys
        if (!isValid (key.key)) {
            return
        }

        // Send keypress to server
        connection.send(JSON.stringify({ KEYPRESS: key }))

        markPressedKeys(keyList, keyboard.getPressedKeys())
    }

    keyboard.start(onKeyPress)
})()

const createKeyMenu = (keyboard) => {
    const listItems = createCommandList(keyboard.getKeyboardCommands())
    listItems.forEach(li => document.getElementById('command-list').appendChild(li))
    return listItems
}

const createCommandList = (commandArr) => {
    return commandArr.map(command => {
        const liItem = document.createElement('li');
        liItem.appendChild(document.createTextNode(`${command.key}: ${command.description}`));
        liItem.setAttribute("key", command.key)

        return liItem
    })
}

const markPressedKeys = (list, pressedKeys) => {
    list.forEach(liItem => {
        liItem.setAttribute("style",
            pressedKeys.has (itemListToKeyMap[liItem.getAttribute('key')]) ? "font-weight: bold" : "font-weight: normal");
    })
}

const itemListToKeyMap = {
    "Right": "ArrowRight",
    "Left": "ArrowLeft",

    "Down": "ArrowDown",
    "Up": "ArrowUp",
    "SPACE": " ",
    "ESC": "Escape",
    "W": "w",
    "S": "s",
    "A": "a",
    "D": "d",
    "Q": "q",
    "E": "e",
    "M": "m",
    "N": "n"
}
const valueSet = new Set (Object.values(itemListToKeyMap))

const isValid = (key) => {
    return valueSet.has(key)
}
