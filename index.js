// Main entry point for the CLI application
import chalk from 'chalk'
import minimist from 'minimist'

import friends from './commands/friends.js'
import help from './commands/help.js'
import init from './commands/init.js'
import own from './commands/own.js'
import version from './commands/version.js'

const commands = { init, own, friends, version, help }

export default async () => {
  const args = minimist(process.argv.slice(2))
  const cmd = args._[0] || 'help'

  try {
    const handler = commands[cmd]
    if (!handler) throw new Error(`"${cmd}" is not a valid command!`)
    await handler(args)
  } catch (error) {
    console.error(chalk.red('Error:', error.message))
  }
}
