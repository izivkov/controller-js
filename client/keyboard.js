/*
 * Developed for the OpenBot project (https://openbot.org) by:
 *
 * Ivo Zivkov
 * izivkov@gmail.com
 *
 * Date: Mon Nov 29 2021
 */

export class Keyboard {

    constructor() {

        const pressedKeys = new Set()

        this.start = (onKeyPress) => {
            processKeys(onKeyPress, createKeyMenu())
        }

        const createKeyMenu = () => {
            const listItems = createCommandList(getKeyboardMenu())
            listItems.forEach(li => document.getElementById('command-list').appendChild(li))
            return listItems
        }
        
        const highlightPressedKeys = (list) => {
            list.forEach(liItem => {
                const itemKey = liItem.getAttribute('key')
                const keypressName = itemListToKeyMap[itemKey]
        
                liItem.setAttribute("style",
                    pressedKeys.has (keypressName) ? "font-weight: bold" : "font-weight: normal");
            })
        }

        const getKeyboardMenu = () => {
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
    
        const isValid = key => valueSet.has(key)        

        const processKeys = (onKeypress, keyList) => {
            document.addEventListener('keydown', (event) => {

                if (!isValid (event.key)) {
                    return
                }

                // keep track of pressed key
                pressedKeys.add(event.key)
    
                const {altKey, code, ctrlKey, key, shiftKey, type} = event
                const keyPerss = {altKey: altKey, code: code, ctrlKey: ctrlKey, key:key, shiftKey:shiftKey, type:type}
                onKeypress(keyPerss)

                highlightPressedKeys(keyList)
            }, false);
    
              document.addEventListener('keyup', (event) => {
                if (!isValid (event.key)) {
                    return
                }
                
                pressedKeys.delete(event.key)
    
                const {altKey, code, ctrlKey, key, shiftKey, type} = event
                const keyPerss = {altKey: altKey, code: code, ctrlKey: ctrlKey, key:key, shiftKey:shiftKey, type:type}
                onKeypress(keyPerss)

                highlightPressedKeys(keyList)
            }, false);

        }
    
        const createCommandList = (commandArr) => {
            return commandArr.map(command => {
                const liItem = document.createElement('li');
                liItem.appendChild(document.createTextNode(`${command.key}: ${command.description}`));
                liItem.setAttribute("key", command.key)
        
                return liItem
            })
        }
        
        const itemListToKeyMap = {
        
            // listItemKey: prepressName
        
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
        
        // set of all keys
        const valueSet = new Set (Object.values(itemListToKeyMap))        
    }
}
