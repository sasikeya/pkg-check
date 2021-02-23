const fs = require('fs')

function getJSON (path) {
  let file = ''
  try {
    file = JSON.parse(fs.readFileSync(path, 'utf-8'))
  } catch (error) {
    new Error(error)
  }
  return file

}

module.exports = {
  getJSON
}