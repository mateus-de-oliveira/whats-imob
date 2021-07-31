import { Flex } from '@chakra-ui/react'

import { Footer } from '../../components/Dashboard/Common/Footer'
import { Header } from '../../components/Dashboard/Common/Header'
import { App } from '../../components/Dashboard'

export default function Dashboard() {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      w="100vw"
      h="100vh"
    >
      <Header />
      <App />
      <Footer />
    </Flex>
  )
}
