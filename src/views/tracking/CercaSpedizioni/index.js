import React, { useEffect, useState } from 'react'
import { APP_NAME } from 'constants/app.constant'
import { useParams } from 'react-router-dom';
import { apiGetSpedizioneNoAuth, apiGetTrackingSpedizioneNoAuth } from 'services/SpedizioniService'

const CercaSpedizione = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const [spedizione, setSpedizione] = useState({})
  const [tracking, setTracking] = useState([])

  useEffect(() => {
      fetchData()
  }, [id])

  useEffect(() => {
    getTracking()
  }, [spedizione])

  const fetchData = async () => {
      if (id) {
          setLoading(true)
          const parametro = (atob(id)*1+16)/7
          const response = await apiGetSpedizioneNoAuth(id)
          if (response) {
              setLoading(false)
              setSpedizione(response.data)
          }
      }
  }

  const getTracking = async () => {
    if (spedizione.discriminante) {
        const response = await apiGetTrackingSpedizioneNoAuth(spedizione.discriminante)
        if (response) {
            setTracking(response.data)
        }
    }
  }


  return (
    <>
      <div className='max-w-[720px] md:max-w-[960px] lg:max-w-[1080px]'>
        <div className='mb-8 flex justify-center'>
          <img  src='../logoEdg.png' alt={`${APP_NAME} logo`} />
        </div>
        <div className="mb-6 text-center">
            <h3 className="mb-1">Cerca Spedizione / Find shipping</h3>
            <h4 className="text-sky-600">Dettagli Spedizione</h4>
        </div>
        {spedizione.id_spedizione > 0 ?
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">

            <div className=" bg-gray-50 p-2 mb-2 text-left">
                <div className=' mt-1'>Mittente: </div>
                <div className="font-semibold text-indigo-600">{spedizione.cliente}</div>
                <div className="mt-2">Destinatario: </div>
                <div className="font-semibold text-sky-600">{spedizione.destinatario}</div>
                <div className="mt-2">Destinazione: </div>
                <div className="font-semibold">{spedizione.destinazione}</div>                        
                <div className="mt-2">Indirizzo:</div>
                <div className="font-semibold">{spedizione.indirizzo}</div>
                <div className="font-semibold">{spedizione.cap} - {spedizione.citta} ({spedizione.codice_nazione})</div>                        
            </div>
        
            <div className="col-span-2 mb-2 text-left">

                <table className="border-collapse w-full">
                    <thead>                               
                        <tr className=' text-xs text-black font-semibold uppercase'>
                            <th className="border border-gray-200 p-1 pl-2">Data</th>
                            <th className="border border-gray-200 p-1 pl-2">Località</th>
                            <th className="border border-gray-200 p-1 pl-2">Evento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tracking.map( (track, index) => {
                                let dataTrack = track.data_tracking_format.split('-')      
                                return (
                                    <tr key={index} className='text-xs text-gray-800'>
                                        <td className="border border-gray-200 p-2 font-semibold">
                                            <div className='text-indigo-600'>{dataTrack[0]}</div>
                                            <div>{dataTrack[1]}</div>
                                        </td>
                                        <td className="border border-gray-200 p-2">{track.localita}</td>
                                        <td className="border border-gray-200 p-2">{track.stato}</td>
                                    </tr>
                            )
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
        :
        <div>
            <div className='mt-16 text-red-700'>
                Non ci sono spedizioni associate al codice inserito / There are no shipments associated with the code entered
            </div>
        </div>
        }
                                
        <div className="mt-8 mb-8">
            <a href="https://www.expressdeliverygroup.com" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Vai alla homepage / Go to the homepage
            </a>
        </div>
      </div>
      <div class="footer border-t">
        Copyright © 2024 Express Delivery All rights reserved.
      </div> 
    </>
  )
}

export default CercaSpedizione