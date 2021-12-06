/*
 * Developed for the OpenBot project (https://openbot.org) by:
 *
 * Ivo Zivkov
 * izivkov@gmail.com
 *
 * Date: Mon Nov 29 2021
 */

export class Keyboard {

    constructor(commandHandler) {
        this.getKeyboardCommands = this.getKeyboardCommands.bind(this);
        this.start = this.start.bind(this);
        this.getPressedKeys = this.getPressedKeys.bind(this)
        this.pressedKeys = new Set()
    }

    start(onKeyPress) {
        this.processKeys(onKeyPress)
    }

    getKeyboardCommands() {
        return [
            { key: 'W', description: 'Go forward' },
            { key: 'S', description: 'Go backward' },
            { key: 'A', description: 'Turn slightly left (while driving)' },
            { key: 'D', description: 'Turn slightly right (while driving)' },
            { key: 'Q', description: 'Rotate left' },
            { key: 'E', description: 'Rotate right' },
            { key: 'M', description: 'Drive mode' },
            { key: 'N', description: 'Toggle noise' },
            { key: 'Left', description: 'Left indicator' },
            { key: 'Right', description: 'Right indicator' },
            { key: 'Up', description: 'Cancel indicators' },
            { key: 'Down', description: 'Network mode' },
            { key: 'SPACE', description: 'Toggle logging' },
            { key: 'ESC', description: 'Quit' },
        ]
    }

    processKeys(onKeypress) {

        document.addEventListener('keydown', (event) => {
            // keep track of pressed key
            this.pressedKeys.add(event.key)

            const {altKey, code, ctrlKey, key, shiftKey, type} = event
            const keyPerss = {altKey: altKey, code: code, ctrlKey: ctrlKey, key:key, shiftKey:shiftKey, type:type}
            onKeypress(keyPerss)
          }, false);

          document.addEventListener('keyup', (event) => {
            this.pressedKeys.delete(event.key)

            const {altKey, code, ctrlKey, key, shiftKey, type} = event
            const keyPerss = {altKey: altKey, code: code, ctrlKey: ctrlKey, key:key, shiftKey:shiftKey, type:type}
            onKeypress(keyPerss)
          }, false);
    }

    getPressedKeys () {
        return this.pressedKeys
    }
}
