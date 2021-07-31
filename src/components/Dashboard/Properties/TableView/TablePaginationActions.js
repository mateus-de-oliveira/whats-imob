import React from 'react'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons'

import { Stack, Flex, Box, Text } from '@chakra-ui/react'

export function TablePaginationActions(props) {
  function handleFirstPageButtonClick(event) {
    console.log('primeira página')
  }

  function handleBackButtonClick(event) {
    console.log('voltar página')
  }

  function handleNextButtonClick(event) {
    console.log('próxima página')
  }

  function handleLastPageButtonClick(event) {
    console.log('última página')
  }

  return (
    <Flex justifyContent="flex-end">
      <Stack spacing={2} direction="row">
        <ChevronLeftIcon w="22px" h="22px" />
        <Text as="u">1</Text>
        <Text>2</Text>
        <Text>3</Text>
        <ChevronRightIcon w="22px" h="22px" />
      </Stack>
    </Flex>
  )
}

export default TablePaginationActions
