// Command to list and filter Venmo friends
import chalk from 'chalk'

import { getToken } from '../services/tokenStorage.js'
import Venmo from '../services/venmo.js'

export default async args => {
  try {
    // Get and validate Venmo token
    const token = await getToken()
    if (!token)
      throw new Error('No access token found. Please run "vo init" first.')

    // Initialize Venmo client and get user's ID
    const venmo = new Venmo(token)
    const { data: { user: { id } } } = await venmo.me()

    // Get all friends with pagination
    let friends = await _getFriends(id, venmo)

    // Filter friends if search term provided
    if (args.find || args.f) {
      const filter = (args.find || args.f).toLowerCase()
      friends = friends.filter(f =>
        f.display_name.toLowerCase().includes(filter)
      )
    }

    // Display friends list
    friends.forEach(f => console.log(`${f.display_name} (${f.id})`))
  } catch (error) {
    console.error(chalk.red('Error:', error.message))
  }
}

// Helper function to fetch all friends using pagination
const _getFriends = async (id, venmo) => {
  let friends = []
  let offset = 0

  // Fetch friends in batches of 10 until no more results
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data, pagination } = await venmo.friends(id, 10, offset)
    friends = friends.concat(data)
    if (!pagination.next) break
    offset += 10
  }

  return friends
}
