import React from 'react'

import {
  HiOutlinePlusCircle
} from 'react-icons/hi'

import ModalNewListini from './ModalNewListini'
import ModalUpdateListini from './ModalUpdateListini'
import { Button, Input, Tooltip } from 'components/ui'

import {
  toggleModalNewListini
} from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'

function ListiniTableTools() {
  const dispatch = useDispatch()
  const onAddNewListini = () => {
      dispatch(toggleModalNewListini(true))
  }

  return (
    <div>
      <Button
          size="sm"
          variant="twoTone"
          icon={<HiOutlinePlusCircle />}
          onClick={onAddNewListini}
      >
        Nuovo Listino
       </Button>
      
      <ModalNewListini />
      <ModalUpdateListini />
      
    </div>
  )
}

export default ListiniTableTools