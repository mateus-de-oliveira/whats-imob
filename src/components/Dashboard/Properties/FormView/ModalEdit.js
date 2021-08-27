import React, { useEffect } from 'react'

import { isEmpty } from 'lodash/fp'
import { useForm } from 'react-hook-form'
import {
  Input,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Stack,
  Button,
  Switch,
} from '@chakra-ui/react'

import propertiesApi from '../../Services/Api/properties'
import { usePropertiesContext } from '../Context'

export default function ModalCreate() {
  const {
    properties,
    setProperties,
    isOpenModalEdit,
    onCloseModalEdit,
    propertieSelected,
  } = usePropertiesContext()
  const toast = useToast()
  const initialRef = React.useRef()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

  useEffect(() => {
    reset({ ...propertieSelected })
  }, [propertieSelected])

  const onSubmit = (data) =>
    propertiesApi
      .put('', { propertie_id: propertieSelected.id, data })
      .then((response) => {
        const updatePropertie = properties.map((propertie) => {
          if (propertie.id === propertieSelected.id) {
            propertie.name = data.name
            propertie.description = data.description
            propertie.active = data.active
          }

          return propertie
        })

        setProperties(updatePropertie)

        toast({
          title: response.data.message,
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
        onCloseModalEdit()
      })

  return (
    <Modal
      isOpen={isOpenModalEdit}
      onClose={onCloseModalEdit}
      initialFocusRef={initialRef}
      size='xl'
      id='modal-create'
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Editar imóvel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input
                  isInvalid={isEmpty(errors.name) ? false : true}
                  errorBorderColor='red.500'
                  ref={initialRef}
                  placeholder='Digite o nome do imóvel'
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <Box color='red.500'>Esse campo é obrigatório!</Box>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  placeholder='Digite uma descrição para o imóvel'
                  {...register('description')}
                />
              </FormControl>
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='active'>Ativar imóvel?</FormLabel>
                <Switch id='active' size='lg' {...register('active')} />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type='submit'>
              Adicionar
            </Button>
            <Button variant='ghost' onClick={onCloseModalEdit}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
