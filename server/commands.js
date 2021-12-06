/*
 * Developed for the OpenBot project (https://openbot.org) by:
 *
 * Ivo Zivkov
 * izivkov@gmail.com
 *
 * Date: Mon Nov 29 2021
 */

class Commands {

    constructor(botConnection, browserConnection) {
        this.botConnection = botConnection
        this.browserConnection = browserConnection
        this.handleStatus = this.handleStatus.bind(this);
        this.getCommandHandler = this.getCommandHandler.bind(this);

        this.commandHandler = new CommandHandler(botConnection)
    }

    getCommandHandler () {
        return this.commandHandler
    }

    handleStatus(status /*Json*/) {
        // forward status and WebRTC negotition to browser
        this.browserConnection.send(JSON.stringify(status))
    }
}

class DriveValue {

    constructor() {
        const MAX = 1.0
        const MIN = -1.0
        const DELTA = .05

        let value = 0.0

        this.reset = () => {
            this.value = 0
            return this.value
        }

        this.incr = (by_value = 0) => {
            this.value = Math.min(this.MAX, this.value + (by_value != 0) ? by_value : this.DELTA)
            return Math.round(this.value, 3)
        }

        this.decr = (by_value = 0) => {
            this.value = Math.max(this.MIN, this.value - (by_value != 0) ? by_value : this.DELTA)
            return Math.round(this.value, 3)
        }

        this.max = () => {
            this.value = MAX
            return this.value
        }

        this.min = () => {
            this.value = MIN
            return this.value
        }

        this.write = (value) => {
            this.value = value
            return this.value
        }

        this.read = () => {
            this.value = value
            return Math.round(this.value, 3)
        }
    }
}

class CommandHandler {
    constructor(botConnection) {
        this.left = new DriveValue()
        this.right = new DriveValue()
        this.timeoutObj = null

        this.sendCommand = (command) => {
            botConnection.send(`{command: ${command} }\n`)
        }

        this.sendDriveCommand = (left, right) => {
            if (this.timeoutObj !== null) {
                clearTimeout(this.timeoutObj)
            }
            botConnection.send(`{driveCmd:{l:${left},r:${right}}}\n`)

            this.timeoutObj = setTimeout(() => {
                this.reset()
            }, 200);
        }

        this.reset = () => {
            this.left.reset()
            this.right.reset()
            botConnection.send(`{driveCmd:{l:${this.left.read()},r:${this.right.read()}}}\n`)
        }

        this.forwardLeft = () => {
            this.sendDriveCommand(this.left.write(0.75), this.right.max())
        }

        this.forwardRight = () => {
            this.sendDriveCommand(this.left.max(), this.right.write(0.75))
        }

        this.backwardLeft = () => {
            this.sendDriveCommand(this.left.min(), this.right.write(-0.75))
        }

        this.backwardRight = () => {
            this.sendDriveCommand(this.left.write(-0.75), this.right.min())
        }

        this.rotateLeft = () => {
            this.sendDriveCommand(this.left.min(), this.right.max())
        }

        this.rotateRight = () => {
            this.sendDriveCommand(this.left.max(), this.right.min())
        }

        this.goForward = () => {
            this.sendDriveCommand(this.left.max(), this.right.max())
        }

        this.goBackward = () => {
            this.sendDriveCommand(this.left.min(), this.right.min())
        }
    }
}

module.exports = Commands, CommandHandler;
