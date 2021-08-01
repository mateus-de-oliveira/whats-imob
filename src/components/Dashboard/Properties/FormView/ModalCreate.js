import React from 'react'

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
  const { properties, setProperties, isOpenModalCreate, onCloseModalCreate } =
    usePropertiesContext()
  const toast = useToast()
  const initialRef = React.useRef()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) =>
    propertiesApi.post('', { ...data }).then((response) => {
      setProperties([...properties, response.data])
      reset({ name: '', description: '', active: true })
      toast({
        title: response.data.message,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      onCloseModalCreate()
    })

  return (
    <Modal
      isOpen={isOpenModalCreate}
      onClose={onCloseModalCreate}
      initialFocusRef={initialRef}
      size="xl"
      id="modal-create"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Cadastrar imóvel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input
                  isInvalid={isEmpty(errors.name) ? false : true}
                  errorBorderColor="red.500"
                  ref={initialRef}
                  placeholder="Digite o nome do imóvel"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <Box color="red.500">Esse campo é obrigatório!</Box>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  placeholder="Digite uma descrição para o imóvel"
                  {...register('description')}
                />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="active">Ativar imóvel?</FormLabel>
                <Switch
                  id="active"
                  defaultChecked="true"
                  size="lg"
                  {...register('active')}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Adicionar
            </Button>
            <Button variant="ghost" onClick={onCloseModalCreate}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
