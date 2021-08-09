import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { PropertiesProvider } from '../components/Dashboard/Properties/Context'
import { WhatsappProvider } from '../components/Dashboard/Whatsapp/Context'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <WhatsappProvider>
        <PropertiesProvider>
          <Component {...pageProps} />
        </PropertiesProvider>
      </WhatsappProvider>
    </ChakraProvider>
  )
}
export default MyApp
