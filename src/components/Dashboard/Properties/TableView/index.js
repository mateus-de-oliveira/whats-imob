import React from 'react'

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
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

import TablePaginationActions from './TablePaginationActions'
import { usePropertiesContext } from '../Context'

export default function TableView() {
  const {
    properties,
    onOpenModalCreate,
    onOpenModalEdit,
    setIsOpenModalDelete,
    setPropertieSelected,
  } = usePropertiesContext()

  return (
    <Container maxW="container.xl">
      <Flex alignItems="center">
        <Center flex="1 1 0">
          <Flex flexDirection="column" width="100%">
            <Stack spacing={4} direction="column">
              <Flex justifyContent="flex-end">
                <Button
                  colorScheme="teal"
                  size="md"
                  onClick={() => onOpenModalCreate()}
                >
                  ADICIONAR IMÓVEL
                </Button>
              </Flex>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Status</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {properties.map((propertie) => {
                    return (
                      <Tr key={propertie.propertie_id}>
                        <Td>{propertie.name}</Td>
                        <Td>
                          {propertie.active === true ? (
                            <Badge colorScheme="green">Ativo</Badge>
                          ) : (
                            <Badge colorScheme="red">Inativo</Badge>
                          )}
                        </Td>
                        <Td>
                          <Stack spacing={3} direction="row">
                            <Button
                              variant="outline"
                              height="40px"
                              width="40px"
                              borderColor="gray.500"
                              onClick={() => {
                                setPropertieSelected(propertie)
                                onOpenModalEdit()
                              }}
                            >
                              <EditIcon w="5" h="5" color="gray.700" />
                            </Button>
                            <Button
                              variant="outline"
                              height="40px"
                              width="40px"
                              borderColor="gray.500"
                              onClick={() => {
                                setPropertieSelected(propertie)
                                setIsOpenModalDelete(true)
                              }}
                            >
                              <DeleteIcon w="5" h="5" color="gray.700" />
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
        <Center ml="30px" mr="30px">
          <Divider orientation="vertical" height="60vh" />
        </Center>
        <Center flex="1 1 0">
          <Image objectFit="cover" src="qr.png" />
        </Center>
      </Flex>
    </Container>
  )
}
