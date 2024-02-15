import React from 'react'
import { AdaptableCard } from 'components/shared'
import TrackingInfo from './home/components/TrackingInfo'
import CustomerInfo from './home/components/CustomerInfo'
import SystemInfo from './home/components/SystemInfo'

const Home = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Dashboard</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <TrackingInfo/>
                <CustomerInfo/>
                <SystemInfo/>
            </div>
             
     
        </AdaptableCard>        
    )
}

export default Home