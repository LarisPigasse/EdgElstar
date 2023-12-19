import React from 'react'
import SpedizioniTableSearch from './SpedizioniTableSearch'
import ModalViewSpedizioni from './ModalViewSpedizioni'

function SpedizioniTableTools() {

  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
    <SpedizioniTableSearch />
    <ModalViewSpedizioni />
</div>
  )
}

export default SpedizioniTableTools