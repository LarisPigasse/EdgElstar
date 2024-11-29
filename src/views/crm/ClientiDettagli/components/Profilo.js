import React, {useState, useEffect, useCallback, } from 'react'
import { Card, Button} from 'components/ui'
import { getCliente } from '../store/dataSlice'
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { apiGetCliente } from 'services/ClientiService'

const CustomerInfoField = ({ title, value }) => {
    return (
        <div>
            <span>{title}</span>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
                {value}
            </p>
        </div>
    )
}

const Profilo = () => {

    const [info, setInfo] = useState([]);

    const fetchData = async () => {
        const result = await apiGetCliente();
        setInfo(result.data);
    }

    useEffect(() => {
      fetchData();
    },[]);

    return (
        <Card className="hover:border-sky-300 hover:shadow-sm ">
            <h6 className="font-semibold mb-4 text-sm">CLIENTI</h6>
            <div className="flex justify-between items-center">
                    {info.length > 0 ? (
                        <span>Clienti attivi: <span className=' font-bold mr-1 text-sky-600'>{info[0].clienti_attivi}</span></span>
                    ) : (
                        <span>Loading...</span>
                    )}
            </div>
            <div className="flex justify-between items-center mt-3">
                    {info.length > 0 ? (
                       <span>Ultimo inserito:<br/> 
                       <span className='text-xs font-semibold'>{info[0].cliente}</span>
                       </span>
                    ) : (
                        'Loading...'
                    )}
            </div>            
        </Card>
    )
}

export default Profilo