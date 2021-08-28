import { wa, ev } from '@open-wa/wa-automate'
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

export default function Qr(req, res) {
  async function start(client) {
    const data = await client.getMe()
    const url = await client.getProfilePicFromServer('558596849077@c.us')
    const sessionId = await client.getSessionId()
    const id = 1
    console.log(data)
    // sessionId: Math.random().toString(),

    if (data && url) {
      database
        .ref('whatsapp/users/' + 1)
        .set({
          user: data.me.user,
          name: data.pushname,
          imageProfile: url,
          sessionId: sessionId,
        })
        .then(() => {
          database.ref('whatsapp/qr/loading').set({
            isLoading: false,
          })
        })
    }
  }

  if (req.method === 'GET') {
    const dbRef = firebase.database().ref('qr/')
    dbRef
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          create({ sessionId: data.sessionId, ...launchConfig }).then(
            (client) => {
              database.ref('whatsapp/qr/loading').set({
                isLoading: true,
              })
              client.onStateChanged(async (state) => {
                console.log('statechanged', state)

                if (state === 'OPENING') {
                  await database.ref('qr/').set(null)
                  await database.ref('whatsapp/users/' + 1).set(null)
                  await whatsappApi.get('/qr')
                }
              })

              start(client)
            }
          )

          console.log(snapshot.val())
        } else {
          create({ sessionId: Math.random().toString(), ...launchConfig }).then(
            (client) => {
              database.ref('whatsapp/qr/loading').set({
                isLoading: true,
              })
              client.onStateChanged(async (state) => {
                console.log('statechanged', state)

                if (state === 'OPENING') {
                  await database.ref('qr/').set(null)
                  await database.ref('whatsapp/users/' + 1).set(null)
                  await whatsappApi.get('/qr')
                }
              })

              start(client)
            }
          )
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })

    ev.on('qr.**', async (qrcode) => {
      if (qrcode)
        database.ref('qr/').set({
          dataImage: qrcode,
        })
    })

    res.status(200)
  }
}
