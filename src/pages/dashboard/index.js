import { Flex } from '@chakra-ui/react'
// import { ev, create } from '@open-wa/wa-automate'

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
