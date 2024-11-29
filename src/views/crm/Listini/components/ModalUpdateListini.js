import React from 'react'
import { Dialog } from 'components/ui'
import { toggleModalUpdateListini } from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'
import FormUpdateListini from './FormUpdateListini'

const ModalUpdateListini = () => {
    const dispatch = useDispatch()

    const modalUpdateListini = useSelector(
        (state) => state.crmListini.state.modalUpdateListini
    )

    const onDialogClose = () => {
        dispatch(toggleModalUpdateListini(false))
    }

    return (
        <Dialog
            isOpen={modalUpdateListini}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>Modifica listino</h4>
            <div className="mt-4">
                <FormUpdateListini />
            </div>
        </Dialog>
    )
}

export default ModalUpdateListini
