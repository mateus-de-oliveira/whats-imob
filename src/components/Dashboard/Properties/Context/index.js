import React, { useState, useEffect } from 'react'

import { useDisclosure } from '@chakra-ui/react'

import propertiesApi from '../../Services/Api/properties'

export const MyContext = React.createContext()
export const usePropertiesContext = () => React.useContext(MyContext)

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([])
  const [isLoadingPropertie, setIsLoadingPropertie] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [propertieSelected, setPropertieSelected] = useState({})
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [dataPage, setDataPage] = useState([[]])
  const [dataPerPage, setDataPerPage] = useState([])
  const [propertiesPerPage, setPropertiesPerPage] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(4)
  const [page, setPage] = useState(0)

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
      .then((response) => {
        setProperties(response.data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    setDataPage([[]])

    properties.map((item, index) => {
      if (index % rowsPerPage === 0 && index !== 0) {
        dataPage.push([])
      }

      dataPage[dataPage.length - 1].push(item)
    })

    if (dataPage[page]) {
      setPropertiesPerPage(dataPage[page])
    } else {
      setPropertiesPerPage(dataPage[page - 1])
      setPage(page - 1)
    }

    setDataPerPage(dataPage)
  }, [isLoading, page, properties])

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
        propertiesPerPage,
        page,
        setPage,
        dataPerPage,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}
