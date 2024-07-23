import React from 'react'
import { Card } from 'components/ui'
import { useState, useEffect } from 'react';
import { apiInfoClienti } from 'services/HomeService'

const CustomerInfo = () => {

    const [info, setInfo] = useState([]);

    const fetchData = async () => {
        const result = await apiInfoClienti();
        setInfo(result.data);
    }

    useEffect(() => {
      fetchData();
    },[]);


    return (
        <Card className="hover:border-sky-300 hover:shadow-sm">
            <h6 className="font-semibold mb-4 text-sm">Clienti</h6>
            <div className="flex justify-between items-center">
                    {info.length > 0 ? (
                        <span>Clienti attivi: <span className=' font-bold mr-1 text-sky-600'>{info[0].clienti_attivi}</span></span>
                    ) : (
                        <span>Loading...</span>
                    )}
            </div>
            <div className="flex justify-between items-center mt-3">
                    {info.length > 0 ? (
                       <span>Ultimo inseriti:<br/> 
                       <span className='text-xs font-semibold'>{info[0].cliente}</span>
                       </span>
                    ) : (
                        'Loading...'
                    )}
            </div>            
        </Card>
    )
}

export default CustomerInfo