import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { Tooltip, Notification, toast } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineTrash, HiOutlinePencil, HiOutlineLink } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getSpedizioni, setTableData, setIdDelete } from '../store/dataSlice'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    toggleModalViewSpedizioni,
    setDataSpedizioni
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'

const SpedizioniColumn = ({ row }) => {
  const dispatch = useDispatch()
  const { textTheme } = useThemeClass()

  const onView = () => {
    dispatch(setDataSpedizioni(row))
    dispatch(toggleModalViewSpedizioni(true))
  }
  return (
      <span
          className={`cursor-pointer select-none hover:${textTheme}`}
          onClick={onView}
      >
          <span className=' text-sky-500 font-semibold '>{row.id_spedizione}</span>
      </span>
  )
}

const SpedizioniData = ({ row }) => {
    return (
        <span>{dayjs(row.data_spedizione).format('DD/MM/YYYY')}</span>
    )
}

const ActionColumn = ({ row }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onEdit = () => {
    navigate(`/tracking/spedizioni-edit/${row.id_spedizione}`)
}

  const onDelete = () => {
      dispatch(setDeleteMode('single'))
      dispatch(setIdDelete({id_spedizione: row.id_spedizione, id_cliente: row.id_cliente}))
  }
 
  return (
      <div className="flex justify-end text-lg">

          <Tooltip title="Modifica">
              <span
                  className="cursor-pointer p-2 hover:text-blue-500"
                  onClick={onEdit}
              >
                  <HiOutlinePencil />
              </span>
          </Tooltip>
          <Tooltip title="Elimina">
              <span
                  className="cursor-pointer p-2 hover:text-red-500"
                  onClick={onDelete}
              >
                  <HiOutlineTrash />
              </span>
          </Tooltip>         
      </div>
  )
}


const SpedizioniTable = () => {

  const tableRef = useRef(null)

  const dispatch = useDispatch()

  const { pageIndex, pageSize, sort, query, total } = useSelector(
      (state) => state.trackingSpedizioni.data.tableData
  )
  const loading = useSelector((state) => state.trackingSpedizioni.data.loading)

  const data = useSelector((state) => state.trackingSpedizioni.data.orderList)

  const fetchData = useCallback(() => {
      dispatch(getSpedizioni({ pageIndex, pageSize, sort, query }))
  }, [dispatch, pageIndex, pageSize, sort, query])

  useEffect(() => {
      dispatch(setSelectedRows([]))
      fetchData()
  }, [dispatch, fetchData, pageIndex, pageSize, sort])

  useEffect(() => {
      if (tableRef) {
          tableRef.current?.resetSelected()
      }
  }, [data])

  const tableData = useMemo(
      () => ({ pageIndex, pageSize, sort, query, total }),
      [pageIndex, pageSize, sort, query, total]
  )

  const openNotification = (
    placement,
    title,
    type
) => {
    toast.push(<Notification closable duration={2000} type={type} title={title} />, {
        placement: placement,
    })
}
  
const handleCopy = async (spedizione) => {
    try {
        let numsped = btoa(spedizione*7-16)
        await navigator.clipboard.writeText(`https://trace.expressdeliverygroup.com/spedizione/${numsped}`);
        openNotification('top-center', 'Link copiato', 'success');
    } catch (err) {
        openNotification('top-center', 'Impossibile copiare il link', 'danger');
    }
};
 

  const columns = useMemo(
      () => [
          {
              header: 'Id',
              accessorKey: 'id_spedizione',
              cell: (props) => <SpedizioniColumn row={props.row.original} />,
          },
          {
              header: 'Data',
              accessorKey: 'data_spedizione',
              cell: (props) => <SpedizioniData row={props.row.original} />,
          },
          {
            header: 'Cliente',
            accessorKey: 'cliente',
          },
          {
            header: 'Corriere',
            accessorKey: 'corriere',
          },
          {
            header: 'Codice',
            accessorKey: 'altro_numero',
            cell: (props) => {
                const row = props.row.original
                return <span className="font-bold">{row.altro_numero}</span>
            },      
          },
          {
            header: 'Num. spedizione',
            accessorKey: 'discriminante',
            cell: (props) => {
                const row = props.row.original
                return  <div className="flex flex-row">
                            <div className="basis-1/2 font-bold mt-2 text-red-600">
                                {row.discriminante}
                            </div>
                            <div className='basis-1/2 text-right'> 
                                <Tooltip title="Copia link">
                                    <div onClick={() => handleCopy(row.discriminante)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded">
                                        <HiOutlineLink />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
            },             
          },                                         
          {
            header: 'Destinazione',
            accessorKey: 'destinazione',
          },
          {
            header: 'Destinatario',
            accessorKey: 'destinatario',
          },
          {
            header: 'Stato',
            accessorKey: 'stato',
          },                    
          {
              header: '',
              id: 'action',
              cell: (props) => <ActionColumn row={props.row.original} />,
          },
      ],
      []
  )

  const onPaginationChange = (page) => {
      const newTableData = cloneDeep(tableData)
      newTableData.pageIndex = page
      dispatch(setTableData(newTableData))
  }

  const onSelectChange = (value) => {
      const newTableData = cloneDeep(tableData)
      newTableData.pageSize = Number(value)
      newTableData.pageIndex = 1
      dispatch(setTableData(newTableData))
  }

  const onSort = (sort) => {
      const newTableData = cloneDeep(tableData)
      newTableData.sort = sort
      dispatch(setTableData(newTableData))
  }

  const onRowSelect = (checked, row) => {
      if (checked) {
          dispatch(addRowItem([row.id]))
      } else {
          dispatch(removeRowItem(row.id))
      }
  }

  const onAllRowSelect = useCallback(
      (checked, rows) => {
          if (checked) {
              const originalRows = rows.map((row) => row.original)
              const selectedIds = []
              originalRows.forEach((row) => {
                  selectedIds.push(row.id)
              })
              dispatch(setSelectedRows(selectedIds))
          } else {
              dispatch(setSelectedRows([]))
          }
      },
      [dispatch]
  )

  return (
      <DataTable
          ref={tableRef}
          columns={columns}
          data={data}
          loading={loading}
          pagingData={tableData}
          onPaginationChange={onPaginationChange}
          onSelectChange={onSelectChange}
          onSort={onSort}
          onCheckBoxChange={onRowSelect}
          onIndeterminateCheckBoxChange={onAllRowSelect}

      />
  )
}

export default SpedizioniTable