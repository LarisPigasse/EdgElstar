import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import SpedizioniTable from './components/SpedizioniTable'
import SpedizioniTableTools from './components/SpedizioniTableTools'
import SpedizioniDeleteConfirmation from './components/SpedizioniDeleteConfirmation'

injectReducer('trackingSpedizioni', reducer)

const Spedizioni = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Spedizioni clienti</h3>
                <SpedizioniTableTools />
            </div>
            <SpedizioniTable />
            <SpedizioniDeleteConfirmation />
        </AdaptableCard>
    )
}

export default Spedizioni