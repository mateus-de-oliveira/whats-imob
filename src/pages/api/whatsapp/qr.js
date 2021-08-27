import { wa, ev } from '@open-wa/wa-automate'
import { create, Client } from '@open-wa/wa-automate'
import firebase from 'firebase/app'
import { database } from '../../../../config/database/'

const launchConfig = {
  cacheEnabled: false,
  useChrome: true,
  sessionId: 'hr',
  qrTimeout: 0,
}

async function start(client) {
  client.sendText(chatId, '<3')
}

export default function Qr(req, res) {
  if (req.method === 'GET') {
    create(launchConfig).then((client) => start(client))
    ev.on('qr.**', async (qrcode) => {
      if (qrcode)
        database
          .ref('qr/')
          .set({
            dataImage: qrcode,
          })
          .then(() => res.send('ok'))
    })

    return res.send(qrcode)
  }
}
