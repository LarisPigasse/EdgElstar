import React, { useEffect, useState } from 'react'
import { Dialog, Button, Tooltip, Drawer, toast, Notification } from 'components/ui'
import { toggleModalViewSpedizioni, setDataSpedizioni, toggleDrawerInsertTracking } from '../store/stateSlice'
import { getTracking, deleteTracking, getPodPdf } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import {HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi'
import { ConfirmDialog } from 'components/shared'
import TrackingForm from './TrackingForm'
import { BsFileEarmarkPdf } from 'react-icons/bs'

const ModalViewSpedizioni = () => {  

    //const [tracking, setTracking] = useState([]);

    const dispatch = useDispatch()

    const modalViewSpedizioni = useSelector(
        (state) => state.trackingSpedizioni.state.modalViewSpedizioni
    )

    const drawerInsertTracking = useSelector(
        (state) => state.trackingSpedizioni.state.drawerInsertTracking
    )

    const onDialogClose = () => {
        dispatch(toggleModalViewSpedizioni(false))
        //setTracking([])
        dispatch(getTracking(0))
        dispatch(setDataSpedizioni([]))
    }

    const dataSpedizioni = useSelector(
        (state) => state.trackingSpedizioni.state.dataSpedizioni
    )

    const tracking = useSelector(
        (state) => state.trackingSpedizioni.data.dataTracking
    )

    const fetchData = async () => {
        if(dataSpedizioni.id_spedizione){
        //   let dati = await getTrackingSpedizione(dataSpedizioni.id_spedizione)
        //   setTracking(dati);

          dispatch(getTracking(dataSpedizioni.id_spedizione))
        }
    }

    useEffect(() => {
        fetchData();
    }, [dataSpedizioni]);

    const [open, setOpen] = useState(false)
    
    const handleClose = () => {
        setOpen(false)
    }

    const handleClickPod = () => {
        alert('Hai cliccato il pulsante!');
        if(dataSpedizioni.id_spedizione){
            dispatch(getPodPdf(dataSpedizioni.id_spedizione))
        }        
    };

    const handleConfirm = async () => {
        
        let ok = await deleteTracking({
            id_spedizione:dataSpedizioni.id_spedizione, 
            id_tracking:selectedTracking,
        })

        if(ok){
            fetchData();
            toast.push(
                <Notification
                    title="Tracking registrato con successo."
                    type="success"
                    duration={3500}
                >
                    qualcosa...
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }


        setOpen(false)
    }
    
    const [selectedTracking, setSelectedTracking] = useState(null);
    
    function handleClick(id_tracking) {
        setOpen(true);
        setSelectedTracking(id_tracking);
    }

    const onDialogCloseDrawer = () => {
        dispatch(toggleDrawerInsertTracking(false))
       
        // dispatch(setDataSpedizioni([]))
    }

    const handleAddTracking = () => {
        dispatch(toggleDrawerInsertTracking(true))
    }

    return (
  
        <Dialog
            isOpen={modalViewSpedizioni}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            preventScroll={false}
            contentClassName={'overflow-y-auto'}
            width={1280}
        >

            <Drawer
                title="Inserisci dettaglio del tracking"
                isOpen={drawerInsertTracking}
                onClose={onDialogCloseDrawer}
                onRequestClose={onDialogCloseDrawer}
            >
                <TrackingForm/>
            </Drawer>

            <ConfirmDialog
                isOpen={open}
                onClose={handleClose}
                onRequestClose={handleClose}
                type={'danger'}
                title={'Elimina dettaglio tracking'}
                onCancel={handleClose}
                onConfirm={handleConfirm}
                confirmButtonColor={'red-600'}
                id_tracking = {selectedTracking}
            >
                <p>Confermi la cancellazione del dettaglio {selectedTracking} selezionato?</p>
            </ConfirmDialog>

            <h4>Dettagli Spedizione {dataSpedizioni.id_spedizione}</h4>            

            <div className="mt-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">

                    <div className=" bg-gray-50 p-2 mb-2">
                        <div className=' mt-1'>Mittente: </div>
                        <div className="font-semibold text-indigo-600">{dataSpedizioni.cliente}</div>
                        <div className="mt-2">Destinatario: </div>
                        <div className="font-semibold text-sky-600">{dataSpedizioni.destinatario}</div>
                        <div className="mt-2">Destinazione: </div>
                        <div className="font-semibold">{dataSpedizioni.destinazione}</div>                        
                        <div className="mt-2">Indirizzo:</div>
                        <div className="font-semibold">{dataSpedizioni.indirizzo}</div>
                        <div className="font-semibold">{dataSpedizioni.cap} - {dataSpedizioni.citta} ({dataSpedizioni.codice_nazione})</div>
                        <div className="mt-4 pt-2 border-t border-sky-300">Corriere: </div>
                        <div className="font-semibold text-red-600">{dataSpedizioni.corriere}</div>
                        <div className="mt-2">Codice: </div>
                        <div className="font-semibold text-black">{dataSpedizioni.altro_numero}</div>
                        {dataSpedizioni.stato === 'CONSEGNATA' ? 
                            <div className="mt-4 pt-3 border-t text-indigo-600 font-bold border-sky-300">
                                <div
                                    className=" w-20 flex items-center cursor-pointer border px-2 py-2 bg-sky-50 hover:bg-sky-100 border-gray-200 rounded-lg"
                                >
                                    <div className="text-2xl pr-1">
                                        <BsFileEarmarkPdf className="text-red-500" />
                                    </div>
                                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                                        <button onClick={handleClickPod}>POD</button>
                                    </div>
                                </div>
                            </div>
                        : null}                                                 
                    </div>
                    <div className="col-span-2 mb-2">

                        <table className="border-collapse w-full">
                            <thead>                               
                                <tr className=' text-xs text-black font-semibold uppercase'>
                                    <th className="border border-gray-200 p-1">Data</th>
                                    <th className="border border-gray-200 p-1">Località</th>
                                    <th className="border border-gray-200 p-1">Evento</th>
                                    <th className="border border-gray-200 p-1">Info</th>
                                    <th className="px-2 py-4">
                                        <Tooltip title="Aggiungi dettaglio">
                                            <HiOutlinePlus onClick={handleAddTracking} className="text-sky-600 hover:text-red-600 text-lg"/>
                                        </Tooltip>    
                                    </th>
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
                                                <td className="border border-gray-200 p-2">{track.info}</td>
                                                <td className="p-2">
                                                    <Tooltip title="Elimina dettaglio">
                                                        <HiOutlineTrash onClick={() =>  handleClick(track.id_tracking)}  className="text-gray-400 hover:text-red-600 text-lg" />
                                                    </Tooltip>    
                                                </td>
                                            </tr>
                                    )
                                    })
                                }
                            </tbody>
                        </table>

                    </div>
                </div>                                 

            </div>
            <div className="text-right mt-6">
                <Button
                    className="ltr:mr-2 rtl:ml-2"
                    variant="twoTone"
                    onClick={onDialogClose}
                >
                    Chiudi
                </Button>
            </div>
        </Dialog>

    )
}

export default ModalViewSpedizioni