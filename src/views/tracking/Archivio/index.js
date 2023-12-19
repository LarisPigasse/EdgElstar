import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import SpedizioniTable from './components/SpedizioniTable'
import SpedizioniTableTools from './components/SpedizioniTableTools'

injectReducer('trackingSpedizioni', reducer)

const Archivio = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
             <div className="lg:flex items-center justify-between mb-4">
                 <h3 className="mb-4 lg:mb-0">Spedizioni archiviate</h3>
                 <SpedizioniTableTools />
             </div>
             <SpedizioniTable />
        </AdaptableCard>
    )
}

export default Archivio