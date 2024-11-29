import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import Profilo from './components/Profilo'

injectReducer('crmDettagliClienti', reducer)

const DettagliCLienti = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Dettaglio cliente</h3>
            </div>
            <Profilo />
        </AdaptableCard>
    )
}

export default DettagliCLienti