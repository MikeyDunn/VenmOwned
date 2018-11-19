// services
const keytar = require('keytar')
const chalk = require('chalk')
const Venmo = require('../services/venmo')

// keytar options
const keytarService = 'venmowned'
const keytarAccount = 'token'

// Public Functions

module.exports = async args => {
  // venmo instance
  const token = await _getToken()
  const venmo = new Venmo(token)

  // get user's ID
  const responseMe = await venmo.me()
  const userId = responseMe.data.user.id

  // get user's friends
  let friends = await _getFriends(userId)

  // filter if command is finding
  const findString = args.find || args.f
  if (findString) friends = _filterFriends(findString, friends)

  _printList(friends)
}

// Private Functions

async function _getFriends(id) {
  // venmo instance
  const token = await _getToken()
  const venmo = new Venmo(token)

  // loop storage
  let friends = []
  let done = false
  let offset = 0

  while (!done) {
    const responseFriends = await venmo.friends(id, 10, offset)
    const { data, pagination } = responseFriends
    done = !pagination.next
    offset += 10
    friends = friends.concat(data)
  }

  return friends
}

function _filterFriends(filterString, dataArr) {
  return dataArr.filter(item => {
    const name = item.display_name.toLowerCase()
    const filter = filterString.toLowerCase()
    return name.includes(filter)
  })
}

async function _printList(dataArr) {
  return dataArr.map(item => {
    const { display_name, id } = item
    const username = chalk.white(`${display_name}`)
    const userId = chalk.gray(`- ${id}`)
    console.log(username, userId)
  })
}

async function _getToken() {
  const token = await keytar.getPassword(keytarService, keytarAccount)
  return token
}
