import React from 'react'
import { Card } from 'components/ui'
import { useState, useEffect } from 'react';
import { apiGetHomeTracking } from 'services/HomeService'

const TrackingInfo = () => {

    const [tracking, setTracking] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const result = await apiGetHomeTracking();
        setTracking(result);
      };
  
      fetchData();
    }, []);
    console.log(tracking)
    const datas = ['a','b','c']
    return (
        <Card className="hover:border-sky-300 hover:shadow-sm">
            <h6 className="font-semibold mb-4 text-sm">Tracking</h6>
            <div className="flex justify-between items-center">
                <div>
                Dettagli
                {datas.map((item, index) => (
                    <div key={index}>
                        {datas[index]}
                        CIAO
                    </div>
                ))}
                </div>
            </div>
        </Card>
    )
}

export default TrackingInfo