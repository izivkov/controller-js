const Dnssd = require('./dns.js')

const BotConnection = require("./bot-connection.js")
const BrowserConnection = require("./browser-connection")
const Commands = require("./commands.js")
const LocalKeyboard = require("./local-keyboard.js")
const RemoteKeyboard = require("./remote-keyboard.js")

const botConnection = new BotConnection()
const commands = new Commands(botConnection)
const remoteKeyboard = new RemoteKeyboard(commands.getCommandHandler())
remoteKeyboard.start()

const browserConnection = new BrowserConnection()

browserConnection.start(data => {
  // console.log (`Got data from browser ${data}`)
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
