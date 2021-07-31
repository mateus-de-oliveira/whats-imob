import React, { useRef } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react'

import { usePropertiesContext } from '../Context'
import propertiesApi from '../../Services/Api/properties'
export default function ModalDelete() {
  const {
    properties,
    setProperties,
    propertieSelected,
    isOpenModalDelete,
    setIsOpenModalDelete,
  } = usePropertiesContext()
  const onCloseModalDelete = () => setIsOpenModalDelete(false)
  const cancelRef = useRef()
  const toast = useToast()

  const handleDeletePropertie = (id) => {
    return propertiesApi
      .delete('', {
        data: { propertie_id: id },
      })
      .then((response) => {
        const newProperties = properties.filter(
          (propertie) => propertie.propertie_id !== id,
        )
        setProperties(newProperties)

        toast({
          title: response.data.message,
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch((err) => console.log(err))
  }

  return (
    <AlertDialog
      isOpen={isOpenModalDelete}
      leastDestructiveRef={cancelRef}
      onClose={onCloseModalDelete}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deletar imóvel
          </AlertDialogHeader>

          <AlertDialogBody>
            Você tem certeza? Você não pode desfazer esta ação depois.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseModalDelete}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                handleDeletePropertie(propertieSelected.propertie_id)
                onCloseModalDelete()
              }}
              ml={3}
            >
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
