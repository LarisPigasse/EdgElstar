import React from 'react'

import {
  HiOutlinePlusCircle
} from 'react-icons/hi'

import ModalViewAggiornamento from './ModalViewAggiornamento'
import { Button, Input, Tooltip } from 'components/ui'

import {
  toggleModalNewAggiornamento
} from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'

function AggiornamentiTableTools() {
  const dispatch = useDispatch()

  return (
    <div>     
      <ModalViewAggiornamento />
    </div>
  )
}

export default AggiornamentiTableTools