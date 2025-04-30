import chalk from 'chalk'
import inquirer from 'inquirer'

import { setToken } from '../services/tokenStorage.js'

export default async () => {
  try {
    const { token } = await inquirer.prompt([{
      type: 'password',
      name: 'token',
      message: 'Enter your access token',
      validate: input => input.length > 0 || 'Access token is required'
    }])

    if (await setToken(token)) {
      console.log(chalk.green('Token stored successfully!'))
    } else {
      console.error(chalk.red('Failed to store token.'))
    }
  } catch (error) {
    console.error(chalk.red('Error:', error.message))
  }
}
