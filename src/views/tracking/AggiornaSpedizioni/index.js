import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import AggiornamentiTable from './components/AggiornamentiTable'
import AggiornamentiTableTools from './components/AggiornamentiTableTools'

injectReducer('trackingAggiornamenti', reducer)

const AggiornamentiSpedizioni = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Aggiornamenti spedizioni ultimi 60 giorni</h3>
                <AggiornamentiTableTools />
            </div>
            <AggiornamentiTable />
        </AdaptableCard>
    )
}

export default AggiornamentiSpedizioni