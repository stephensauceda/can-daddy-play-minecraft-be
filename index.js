const admin = require('firebase-admin')
const parse = require('urlencoded-body-parser')
const serviceAccount = require('./service_account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://can-daddy-play-minecraft.firebaseio.com/'
})

module.exports = async req => {
  const ref = admin.database().ref('candaddyplay')
  const message = await parse(req)
  let data
  try {
    data = await ref.set(message.text)
  } catch (e) {
    return e.message
  }
  return `You set your Minecraft status to ${message.text}.`
}