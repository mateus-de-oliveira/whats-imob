import React from 'react'

import { Stack, Flex, Text, Icon, Button } from '@chakra-ui/react'
import {
  MdFirstPage,
  MdChevronLeft,
  MdChevronRight,
  MdLastPage,
} from 'react-icons/md'

import { usePropertiesContext } from '../Context'

export function TablePaginationActions(props) {
  const { page, setPage, dataPerPage, rowsPerPage } = usePropertiesContext()

  function handleFirstPageButtonClick(event) {
    setPage(0)
  }

  function handleBackButtonClick(event) {
    setPage(page - 1)
  }

  function handleNextButtonClick(event) {
    setPage(page + 1)
  }

  function handleLastPageButtonClick(event) {
    setPage(dataPerPage.length - 1)
  }

  return (
    <Flex justifyContent="flex-end">
      <Stack direction="row" alignItems="center">
        <Button
          variant="ghost"
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
        >
          <Icon w={6} h={6} as={MdFirstPage} color="gray.600" />
        </Button>
        <Button
          variant="ghost"
          onClick={handleBackButtonClick}
          disabled={page === 0}
        >
          <Icon w={6} h={6} as={MdChevronLeft} color="gray.600" />
        </Button>
        <Button
          variant="ghost"
          onClick={handleNextButtonClick}
          disabled={page === dataPerPage.length - 1}
        >
          <Icon w={6} h={6} as={MdChevronRight} color="gray.600" />
        </Button>
        <Button
          variant="ghost"
          onClick={handleLastPageButtonClick}
          disabled={page === dataPerPage.length - 1}
        >
          <Icon w={6} h={6} as={MdLastPage} color="gray.600" />
        </Button>
      </Stack>
    </Flex>
  )
}

export default TablePaginationActions
