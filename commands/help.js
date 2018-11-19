const menus = {
  main: `
    vo [command] <options>

    init ............... initializes user for commands
    own ................ send transactions to user ID
    friends ............ output friends and their IDs
    version ............ show package version
    help ............... show help menu for command
  `,
  friends: `
    vo friends <options>

    --find, -f ......... filter friends list with string
  `
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}
