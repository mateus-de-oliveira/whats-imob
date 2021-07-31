import React, { useState, useEffect } from 'react'

import { useDisclosure } from '@chakra-ui/react'

import propertiesApi from '../../Services/Api/properties'

export const MyContext = React.createContext()
export const usePropertiesContext = () => React.useContext(MyContext)

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [propertieSelected, setPropertieSelected] = useState({})
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

  useEffect(() => {
    console.log(propertieSelected)
  }, [propertieSelected])

  const {
    onClose: onCloseModalCreate,
    onOpen: onOpenModalCreate,
    isOpen: isOpenModalCreate,
  } = useDisclosure()

  const {
    onClose: onCloseModalEdit,
    onOpen: onOpenModalEdit,
    isOpen: isOpenModalEdit,
  } = useDisclosure()

  useEffect(() => {
    propertiesApi
      .get()
      .then((response) => setProperties(response.data))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <MyContext.Provider
      value={{
        properties,
        setProperties,
        isOpenModalCreate,
        onCloseModalCreate,
        onOpenModalCreate,
        isLoading,
        setIsOpenModalDelete,
        isOpenModalDelete,
        propertieSelected,
        setPropertieSelected,
        isOpenModalEdit,
        onOpenModalEdit,
        onCloseModalEdit,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}
