import { Flex } from '@chakra-ui/react'
// import { ev, create } from '@open-wa/wa-automate'
// "@open-wa/wa-automate": "^4.12.3",

import { Footer } from '../../components/Dashboard/Common/Footer'
import { Header } from '../../components/Dashboard/Common/Header'
import { App } from '../../components/Dashboard'

export default function Dashboard(props) {
  return (
    <Flex
      flexDirection='column'
      justifyContent='space-between'
      w='100vw'
      h='100vh'
    >
      <Header />
      <App />
      <Footer />
    </Flex>
  )
}

// export async function getServerSideProps() {
//   function start(client) {
//     console.log(client)
//   }
//   create({
//     qrTimeout: 0,
//   }).then(start)

//   ev.on('qr.**', async (qrcode) => {
//     const imageBuffer = Buffer.from(
//       qrcode.replace('data:image/png;base64,', ''),
//       'base64'
//     )
//     fs.writeFileSync('qr.png', imageBuffer)
//   })

//   let data = 'opa'

//   return { props: { data } }
// }
