// Command to display the current package version
import { readFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import chalk from 'chalk'

// Get the current directory path for ES modules
const __dirname = dirname(fileURLToPath(import.meta.url))

export default async () => {
  try {
    // Read and parse package.json to get version
    const { version } = JSON.parse(
      await readFile(join(__dirname, '../package.json'), 'utf-8')
    )
    console.log(`v${version}`)
  } catch (error) {
    console.error(chalk.red('Error:', error.message))
  }
}
