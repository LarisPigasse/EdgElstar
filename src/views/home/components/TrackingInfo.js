import React from 'react'
import { Card, Button } from 'components/ui'
import { useState, useEffect } from 'react';
import { apiGetHomeTracking, apiAggiornaTracking } from 'services/HomeService'

const TrackingInfo = () => {

    const [tracking, setTracking] = useState([]);
    const [update, setUpdate] = useState(false);

    const fetchData = async () => {
        const result = await apiGetHomeTracking();
        setTracking(result.data);
    }

    useEffect(() => {
      fetchData();
    }, [update]);

    const handleClick = async () => {
        await apiAggiornaTracking();
        setUpdate(!update);
    }

    return (
        <Card className="hover:border-sky-300 hover:shadow-sm">
            <div class="flex">
                <div class="w-1/2">
                    <h6 className="font-semibold mb-4 text-sm">TRACKING</h6>
                </div>
                <div class="w-1/2 text-end">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="twoTone"
                        onClick={handleClick}
                    >
                        AGGIORNA
                    </Button>
                </div>
            </div>
            {tracking.length > 0 ? <>
                <div><span className=' font-semibold mr-1'>{tracking[0].data_aggiornamento_format}</span>ultimo aggiornamento</div>
                <div className='font-bold mt-2'>Spedizioni: </div>
                <div>    
                    selezionate <span className=' font-bold mr-1 text-sky-600'>{tracking[0].qta_selezionata}</span> | 
                    elaborate <span className=' font-bold mr-1 text-red-600'>{tracking[0].qta_aggiornata}</span> |
                    aggiornate <span className=' font-bold mr-1 text-green-600'>{tracking[0].qta_tracking}</span>
                </div>
            </>    
            : ''}
        </Card>
    )
}

export default TrackingInfo