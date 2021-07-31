import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { PropertiesProvider } from '../components/Dashboard/Properties/Context'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <PropertiesProvider>
        <Component {...pageProps} />
      </PropertiesProvider>
    </ChakraProvider>
  )
}
export default MyApp
