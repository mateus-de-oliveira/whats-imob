import { Box, Flex, Center, Image, Icon, Button } from '@chakra-ui/react'

const PowerIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <path
      d="M18.36 6.64C19.6184 7.89879 20.4753 9.50244 20.8223 11.2482C21.1693 12.9939 20.9909 14.8034 20.3096 16.4478C19.6284 18.0921 18.4748 19.4976 16.9948 20.4864C15.5148 21.4752 13.7749 22.0029 11.995 22.0029C10.2151 22.0029 8.47515 21.4752 6.99517 20.4864C5.51519 19.4976 4.36164 18.0921 3.68036 16.4478C2.99909 14.8034 2.82069 12.9939 3.16772 11.2482C3.51475 9.50244 4.37162 7.89879 5.63 6.64"
      stroke="#E83F5B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 2V12"
      stroke="#E83F5B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function Header() {
  return (
    <Box bg="white" w="100%" boxShadow="md" p="2">
      <Flex alignItems="center">
        <Box flex="1"></Box>
        <Box flex="1">
          <Center>
            <Image
              borderRadius="full"
              src="gibbresh.png"
              fallbackSrc="https://via.placeholder.com/50"
            />
          </Center>
        </Box>

        <Flex flex="1" justifyContent="flex-end">
          <Button colorScheme="white" variant="ghost">
            <Icon as={PowerIcon} w="5" h="5" />
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
