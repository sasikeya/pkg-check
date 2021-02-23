import fs from 'fs'

function getJSON (path: string): object {
  let file = {}
  try {
    file = JSON.parse(fs.readFileSync(path, 'utf-8'))
  } catch (error) {
    new Error(error)
  }
  return file

}

export {
  getJSON
}