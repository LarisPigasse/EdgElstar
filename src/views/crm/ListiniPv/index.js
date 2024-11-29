import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import ListiniTable from './components/ListiniTable'
import ListiniTableSearch from './components/ListiniTableSearch'

injectReducer('crmListiniPv', reducer)

const Listini = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Listino Europa Peso/Volume</h3>
                <ListiniTableSearch />
            </div>
            <ListiniTable />
        </AdaptableCard>
    )
}

export default Listini