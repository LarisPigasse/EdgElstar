import React from 'react'
import { Dialog } from 'components/ui'
import { toggleModalViewAggiornamento } from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'

const ModalViewAggiornamento = () => {
    const dispatch = useDispatch()

    const modalViewAggiornamento = useSelector(
        (state) => state.trackingAggiornamenti.state.modalViewAggiornamento
    )

    const onDialogClose = () => {
        dispatch(toggleModalViewAggiornamento(false))
    }

    const dataAggiornamenti = useSelector(
        (state) => state.trackingAggiornamenti.state.dataAggiornamenti
    )

    return (
        <Dialog
            isOpen={modalViewAggiornamento}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            width={768}
            height={256}
        >
            <h4>Dettagi aggiornamento del {dataAggiornamenti.data_aggiornamento}</h4>
            <div className="mt-4">
                <div>Qtà selezionata: {dataAggiornamenti.qta_selezionata}</div>
                <div>Qtà aggiornata: {dataAggiornamenti.qta_aggiornata}</div>
                <div>Report: {dataAggiornamenti.descrizione}</div>
            </div>
        </Dialog>
    )
}

export default ModalViewAggiornamento