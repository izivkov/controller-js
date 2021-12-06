const Dnssd = require('./dns.js')

const BotConnection = require("./bot-connection.js")
const BrowserConnection = require("./browser-connection")
const Commands = require("./commands.js")
const LocalKeyboard = require("./local-keyboard.js")
const RemoteKeyboard = require("./remote-keyboard.js")

const botConnection = new BotConnection()
const browserConnection = new BrowserConnection()

const commands = new Commands(botConnection, browserConnection)
const remoteKeyboard = new RemoteKeyboard(commands.getCommandHandler())
remoteKeyboard.start()


browserConnection.start(data => {
  const dataJson = JSON.parse (data)

  switch (Object.keys(dataJson)[0]) {
    case 'KEYPRESS':
      remoteKeyboard.processKey(dataJson['KEYPRESS'])
  }
})

new Dnssd().start(
  () => botConnection.start(commands.handleStatus), // onServiceUp
  botConnection.stop)  // onServiceDown

new LocalKeyboard(commands.getCommandHandler()).start()
