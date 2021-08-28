import React, { useState } from 'react'

import {
  Divider,
  Flex,
  Container,
  Image,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Center,
  Stack,
  Text,
  Spinner,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

import TablePaginationActions from './TablePaginationActions'
import { usePropertiesContext } from '../Context'
import { useWhatsappContext } from '../../Whatsapp/Context'
import whatsappApi from '../../Services/Api/whatsapp'

import { isEmpty } from 'lodash/fp'

export default function TableView() {
  const {
    onOpenModalCreate,
    onOpenModalEdit,
    setIsOpenModalDelete,
    setPropertieSelected,
    propertiesPerPage,
  } = usePropertiesContext()

  const { qrCode, whatsUser, isLoading, setIsLoading, isLoadingWhatsappInfo } =
    useWhatsappContext()

  return (
    <Container maxW='container.xl'>
      <Flex alignItems='center'>
        <Center flex='1 1 0'>
          <Flex flexDirection='column' width='100%'>
            <Stack spacing={4} direction='column'>
              <Flex justifyContent='flex-end'>
                <Button
                  colorScheme='teal'
                  size='md'
                  onClick={() => onOpenModalCreate()}
                >
                  ADICIONAR IMÓVEL
                </Button>
              </Flex>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Status</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {propertiesPerPage.map((propertie) => {
                    return (
                      <Tr key={propertie.id}>
                        <Td>{propertie.name}</Td>
                        <Td>
                          {propertie.active === true ? (
                            <Badge colorScheme='green'>Ativo</Badge>
                          ) : (
                            <Badge colorScheme='red'>Inativo</Badge>
                          )}
                        </Td>
                        <Td>
                          <Stack spacing={3} direction='row'>
                            <Button
                              variant='outline'
                              height='40px'
                              width='40px'
                              borderColor='gray.500'
                              onClick={() => {
                                setPropertieSelected(propertie)
                                onOpenModalEdit()
                              }}
                            >
                              <EditIcon w='5' h='5' color='gray.700' />
                            </Button>
                            <Button
                              variant='outline'
                              height='40px'
                              width='40px'
                              borderColor='gray.500'
                              onClick={() => {
                                setPropertieSelected(propertie)
                                setIsOpenModalDelete(true)
                              }}
                            >
                              <DeleteIcon w='5' h='5' color='gray.700' />
                            </Button>
                          </Stack>
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
              <TablePaginationActions />
            </Stack>
          </Flex>
        </Center>
        <Center ml='30px' mr='30px'>
          <Divider orientation='vertical' height='60vh' />
        </Center>

        {!isEmpty(whatsUser) ? (
          <Center flex='1 1 0'>
            <Stack spacing={4} direction='column' align='center'>
              <Image
                boxSize='150px'
                borderRadius='full'
                src={whatsUser.imageProfile}
                alt={whatsUser.name}
              />

              <Text>{whatsUser.name}</Text>
              <Text>{whatsUser.user}</Text>
              <Button
                isLoading={isLoading}
                loadingText='Desconectando'
                colorScheme='teal'
                variant={isLoading ? 'outline' : 'solid'}
                size='md'
                onClick={() => {
                  setIsLoading(true)
                  whatsappApi.get('/logout')
                }}
              >
                DESCONECTAR
              </Button>
            </Stack>
          </Center>
        ) : isEmpty(qrCode) ? (
          <Center flex='1 1 0'>
            <Stack direction='column' spacing={4} alignItems='center'>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='green.400'
                size='xl'
              />
              <Text>Carregando QR CODE...</Text>
            </Stack>
          </Center>
        ) : !isLoadingWhatsappInfo ? (
          <Center flex='1 1 0'>
            <Image objectFit='cover' src={qrCode} />
          </Center>
        ) : (
          <Center flex='1 1 0'>
            <Stack direction='column' spacing={4} alignItems='center'>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='green.400'
                size='xl'
              />
              <Text>Carregando informações...</Text>
            </Stack>
          </Center>
        )}
      </Flex>
    </Container>
  )
}
