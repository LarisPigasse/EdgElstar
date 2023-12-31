import React from 'react'

import {
  HiOutlinePlusCircle
} from 'react-icons/hi'

import ModalNewOperatore from './ModalNewOperatore'
import ModalUpdateOperatore from './ModalUpdateOperatore'
import ModalViewOperatore from './ModalViewOperatore'
import { Button, Input, Tooltip } from 'components/ui'

import {
  toggleModalNewOperatore
} from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'

function OperatoriTableTools() {
  const dispatch = useDispatch()
  const onAddNewOperatore = () => {
      dispatch(toggleModalNewOperatore(true))
  }

  return (
    <div>
      <Button
          size="sm"
          variant="twoTone"
          icon={<HiOutlinePlusCircle />}
          onClick={onAddNewOperatore}
      >
        Nuovo operatore
       </Button>
      
      <ModalNewOperatore />
      <ModalUpdateOperatore />
      <ModalViewOperatore />
      
    </div>
  )
}

export default OperatoriTableTools