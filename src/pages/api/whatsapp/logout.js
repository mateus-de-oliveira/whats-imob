import { create, Client } from '@open-wa/wa-automate'
import firebase from 'firebase/app'
import { database } from '../../../../config/database/'
import whatsappApi from '../../../components/Dashboard/Services/Api/whatsapp'

const launchConfig = {
  cacheEnabled: false,
  useChrome: true,
  qrTimeout: 0,
  skipUpdateCheck: true,
  killProcessOnTimeout: false,
}

export default function Logout(req, res) {
  async function start(client) {
    await client.kill()
    await database.ref('qr/').set(null)
    await database.ref('whatsapp/users/' + 1).set(null)
    await whatsappApi.get('/qr')

    return res.send('ok')
  }

  if (req.method === 'GET') {
    const dbRef = firebase.database().ref('whatsapp/users/' + 1)
    dbRef
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          create({ sessionId: data.sessionId, ...launchConfig }).then(
            (client) => start(client)
          )

          console.log(snapshot.val())
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
