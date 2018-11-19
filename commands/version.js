// Public Functions

module.exports = (args) => {
  const { version } = require('../package.json')

  console.log(`v${version}`)
}
