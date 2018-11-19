const minimist = require('minimist')
const chalk = require('chalk')

module.exports = async () => {
  const rawArgs = process.argv.slice(2)
  const args = minimist(rawArgs)

  // set command
  let cmd = args._[0] || 'help'

  // check for common flags
  if (args.version || args.v) cmd = 'version'
  if (args.help || args.h) cmd = 'help'

  // determine and run commannd
  switch (cmd) {
    case 'init':
      require('./commands/init')(args)
      break

    case 'own':
      require('./commands/own')(args)
      break

    case 'friends':
      require('./commands/friends')(args)
      break

    case 'version':
      require('./commands/version')(args)
      break

    case 'help':
      require('./commands/help')(args)
      break

    default:
      const chalkMessage = chalk.red(`"${cmd}" is not a valid command!`)
      console.error(chalkMessage)
      break
  }
}
