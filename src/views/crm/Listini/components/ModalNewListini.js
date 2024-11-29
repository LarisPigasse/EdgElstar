import React from 'react'
import { Dialog } from 'components/ui'
import { toggleModalNewListini } from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'
import FormNewListini from './FormNewListini'

const ModalNewListini = () => {
    const dispatch = useDispatch()

    const modalNewListini = useSelector(
        (state) => state.crmListini.state.modalNewListini
    )

    const onDialogClose = () => {
        dispatch(toggleModalNewListini(false))
    }

    return (
        <Dialog
            isOpen={modalNewListini}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>Inserisci nuovo listino</h4>
            <div className="mt-4">
                <FormNewListini />
            </div>
        </Dialog>
    )
}

export default ModalNewListini
