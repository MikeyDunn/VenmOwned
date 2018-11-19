// Public Functions

module.exports = (args) => {
  _promptUser()
}

// Private Functions

function _promptUser() {
  // prompt service and options
  const prompt = require('prompt')
  const promptParams = [{
    name: 'id',
    description: 'Enter the recipients user ID',
    required: true
  },
  {
    name: 'loops',
    type: 'integer',
    message: 'Input must be an integer',
    description: 'Enter the number of pennies to send',
    required: true
  }]

  // prompt flow
  prompt.message = false
  prompt.start()
  prompt.get(
    promptParams,
    _loopTransactions
  )
}

async function _loopTransactions(err, result) {
  // services
  const chalk = require('chalk')
  const Venmo = require('../services/venmo')

  // declerations
  const { id, loops } = result
  const token = await _getToken()
  const venmo = new Venmo(token)

  try {
    // loop transactions
    for (let i = 0; i < loops; i++) {
      // output progress
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(`running... ${i+1} of ${loops} `)
      // generate note and send transaction
      const note = _generateNote(i)
      await venmo.createPayment(id, note, 0.01, 'private')
    }
    // success message
    console.log(chalk.green('owned!'))
  } catch (e) {
    // error message
    console.log(chalk.red(e.error.error.message))
  }
}

function _generateNote(i) {
  // dictionary
  const catFactsArr = require('../dictionaries/cat-facts')

  // generate note
  const randNum = Math.floor(1000 + Math.random() * 9000)
  const factNum = Math.floor(Math.random() * catFactsArr.length)
  const fact = catFactsArr[factNum]
  const welcomeNote = `Thanks for signing up for Cat Facts! ${randNum}`
  const note = `Cat Fact #${randNum}: ${fact}
    <To cancel Cat Facts, reply 'STOP'>`

  // return welcome note on first loop
  return i === 0 ? welcomeNote : note
}

async function _getToken() {
  // keytar service and options
  const keytar = require('keytar')
  const keytarService = 'venmowned'
  const keytarAccount = 'token'
  const token = await keytar.getPassword(
    keytarService,
    keytarAccount
  )

  return token
}
