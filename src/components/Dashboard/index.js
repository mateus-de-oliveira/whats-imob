import React from 'react'

import { Spinner, Text, Center, Stack } from '@chakra-ui/react'

import { usePropertiesContext } from './Properties/Context'

import ModalCreate from './Properties/FormView/ModalCreate'
import ModalDelete from './Properties/FormView/ModalDelete'
import ModalEdit from './Properties/FormView/ModalEdit'
import Properties from './Properties'

export function App() {
  const { isLoading } = usePropertiesContext()

  if (isLoading) {
    return (
      <Center>
        <Stack direction="column" spacing={4} alignItems="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="green.400"
            size="xl"
          />
          <Text>Carregando informações...</Text>
        </Stack>
      </Center>
    )
  } else {
    return (
      <>
        <ModalCreate />
        <ModalDelete />
        <ModalEdit />
        <Properties />
      </>
    )
  }
}
