import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
} from '../store/stateSlice'
import { deleteListini, getListini } from '../store/dataSlice'

const ListiniDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const selectedRows = useSelector(
        (state) => state.crmListini.state.selectedRows
    )
    const selectedRow = useSelector(
        (state) => state.crmListini.state.selectedRow
    )
    const deleteMode = useSelector(
        (state) => state.crmListini.state.deleteMode
    )
    const tableData = useSelector(
        (state) => state.crmListini.data.tableData
    )

    const onDialogClose = () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            dispatch(setSelectedRow([]))
        }
    }

    const onDelete = async () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            const success = await deleteListini(selectedRow)
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await deleteListini({ id: selectedRows })
            deleteSucceed(success, selectedRows.length)
            dispatch(setSelectedRows([]))
        }
    }

    const deleteSucceed = (success, orders) => {
        if (success) {
            dispatch(getListini(tableData))
            toast.push(
                <Notification
                    title={'Elimina listino'}
                    type="success"
                    duration={2500}
                >
                    {deleteMode === 'single' && 'Order '}
                    {deleteMode === 'batch' && `${orders} orders `}
                    Eliminazione completata con successo
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={deleteMode === 'single' || deleteMode === 'batch'}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Delete listino"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Sei sicuro di procedere all'eliminazione del listino selezionato. La procedura non è reversibile.
            </p>
        </ConfirmDialog>
    )
}

export default ListiniDeleteConfirmation
