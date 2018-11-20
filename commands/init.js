// Public Functions

module.exports = args => {
  _promptUser()
}

// Private Functions

function _promptUser() {
  // prompt service and options
  const prompt = require('prompt')
  const promptParams = [
    {
      name: 'token',
      description: 'Enter your access token',
      required: true
    }
  ]

  // prompt flow
  prompt.message = false
  prompt.start()
  prompt.get(promptParams, _storeToken)
}

async function _storeToken(err, result) {
  // services
  const chalk = require('chalk')
  const keytar = require('keytar')

  // keytar options
  const keytarService = 'venmowned'
  const keytarAccount = 'token'

  // store returned token
  await keytar.setPassword(keytarService, keytarAccount, result.token)

  console.log(chalk.green('token stored!'))
}
