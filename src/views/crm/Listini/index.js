import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import ListiniTable from './components/ListiniTable'
import ListiniTableTools from './components/ListiniTableTools'
import ListiniDeleteConfirmation from './components/ListiniDeleteConfirmation'

injectReducer('crmListini', reducer)

const Listini = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Listini</h3>
                <ListiniTableTools />
            </div>
            <ListiniTable />
            <ListiniDeleteConfirmation />
        </AdaptableCard>
    )
}

export default Listini