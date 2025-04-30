// Command help menu definitions
const menus = {
  // Main help menu showing all available commands
  main: `vo [command] <options>

    init ............... initialize with Venmo token
    own ................ send transactions
    friends ............ list friends
    version ............ show version
    help ............... show help`,

  // Friends command specific help
  friends: `vo friends <options>

    --find, -f ......... filter friends list`
}

// Display the appropriate help menu based on command
export default async args => {
  const subCmd = args._[0] === 'help' ? args._[1] : args._[0]
  console.log(menus[subCmd] || menus.main)
}
