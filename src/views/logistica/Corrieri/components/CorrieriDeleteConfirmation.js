import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
} from '../store/stateSlice'
import { deleteCorrieri, getCorrieri } from '../store/dataSlice'

const CorrieriDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const selectedRows = useSelector(
        (state) => state.logisticaCorriere.state.selectedRows
    )
    const selectedRow = useSelector(
        (state) => state.logisticaCorriere.state.selectedRow
    )
    const deleteMode = useSelector(
        (state) => state.logisticaCorriere.state.deleteMode
    )
    const tableData = useSelector(
        (state) => state.logisticaCorriere.data.tableData
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
            const success = await deleteCorrieri(selectedRow)
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await deleteCorrieri({ id: selectedRows })
            deleteSucceed(success, selectedRows.length)
            dispatch(setSelectedRows([]))
        }
    }

    const deleteSucceed = (success, orders) => {
        if (success) {
            dispatch(getCorrieri(tableData))
            toast.push(
                <Notification
                    title={'Eliminazione completata con successo'}
                    type="success"
                    duration={2500}
                >
                    {deleteMode === 'single' && 'Order '}
                    {deleteMode === 'batch' && `${orders} orders `}
                    successfuly deleted
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
            title="Delete corriere"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Sei sicuro di procedere all'eliminazione del corriere selezionato. La procedura non è reversibile.
            </p>
        </ConfirmDialog>
    )
}

export default CorrieriDeleteConfirmation
