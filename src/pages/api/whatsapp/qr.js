const wa = require('@open-wa/wa-automate')

const launchConfig = {
  useChrome: true,
  autoRefresh: true,
  cacheEnabled: false,
  sessionId: 'hr',
}

function start(client) {
  client.onMessage(async (message) => {
    if (message.body === 'Hi') {
      await client.sendText(message.from, '👋 Hello!')
    }
  })
}

wa.create(launchConfig).then((client) => start(client))
