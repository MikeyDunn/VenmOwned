import chalk from 'chalk'
import inquirer from 'inquirer'

import catFacts from '../dictionaries/cat-facts.js'
import { getToken } from '../services/tokenStorage.js'
import Venmo from '../services/venmo.js'

// Helper function to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default async () => {
  const token = await getToken()
  if (!token) {
    console.error(
      chalk.red('No access token found. Please run "vo init" first.')
    )
    return
  }

  const venmo = new Venmo(token)

  try {
    const { userId, pennies } = await inquirer.prompt([
      {
        type: 'input',
        name: 'userId',
        message: 'Enter recipient user ID (or "q" to quit)',
        validate: input =>
          input === 'q' || input.length > 0 || 'User ID is required'
      },
      {
        type: 'input',
        name: 'pennies',
        message: 'Enter number of pennies to send',
        validate: input => {
          if (input === 'q') return true
          const num = parseInt(input)
          return !isNaN(num) && num > 0 || 'Please enter a valid positive number'
        },
        when: answers => answers.userId !== 'q'
      }
    ])

    if (userId === 'q') {
      console.log(chalk.yellow('Exiting...'))
      return
    }

    console.log(chalk.blue(`Starting to send ${pennies} transactions...`))

    // Send the requested number of transactions with a delay between each
    for (let i = 0; i < parseInt(pennies); i++) {
      const note =
        i === 0
          ? 'Welcome to CatFacts! 🐱'
          : catFacts[Math.floor(Math.random() * catFacts.length)]
      await venmo.createPayment(userId, note, 0.01, 'private')

      // Clear the current line and show progress
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(`Progress: ${i + 1}/${pennies} transactions sent`)

      // Add a 2-second delay between transactions to avoid rate limiting
      if (i < parseInt(pennies) - 1) {
        await delay(2000)
      }
    }

    // Clear the progress line and show completion
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(
      chalk.green(`Successfully sent ${pennies} pennies to ${userId}`)
    )
  } catch (error) {
    console.error(chalk.red('Error:', error.message))
  }
}
