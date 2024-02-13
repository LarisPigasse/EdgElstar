import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlinePencil } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getClienti, setTableData } from '../store/dataSlice'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    toggleModalUpdateCliente,
    toggleModalViewCliente,
    setDataCliente
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import cloneDeep from 'lodash/cloneDeep'

const ClientiColumn = ({ row }) => {
  const dispatch = useDispatch()
  const { textTheme } = useThemeClass()

  const onView = () => {
    dispatch(toggleModalViewCliente(true))
    //dispatch(setDataOperatore(row))
  } 

  return (
      <span
          className={`cursor-pointer select-none hover:${textTheme}`}
          onClick={onView}
      >
          <span className=' text-neutral-400 text-xs'>#</span> <span className=' text-sky-500 font-semibold '>{row.id_cliente}</span>
      </span>
  )
}

const ActionColumn = ({ row }) => {

  const dispatch = useDispatch()
  const { textTheme } = useThemeClass()

  const onUpdate = () => {
    dispatch(toggleModalUpdateCliente(true))
    dispatch(setDataCliente(row))
  }

  const onView = () => {
    dispatch(toggleModalViewCliente(true))
   // dispatch(setDataOperatore(row))
  } 
  
  return (
      <div className="flex justify-end text-lg">
          <Tooltip title="Dettagli cliente">
              <span
                  className={`cursor-pointer p-2 hover:${textTheme}`}
                  onClick={onView}
              >
                  <HiOutlineEye />
              </span>
          </Tooltip>
          <Tooltip title="Modifica">
              <span
                  className="cursor-pointer p-2 hover:text-blue-500"
                  onClick={onUpdate}
              >
                  <HiOutlinePencil />
              </span>
          </Tooltip>
      </div>
  )
}


const ClientiTable = () => {

  const tableRef = useRef(null)

  const dispatch = useDispatch()

  const { pageIndex, pageSize, sort, query, total } = useSelector(
      (state) => state.crmCliente.data.tableData
  )
  const loading = useSelector((state) => state.crmCliente.data.loading)

  const data = useSelector((state) => state.crmCliente.data.orderList)

  const fetchData = useCallback(() => {
      dispatch(getClienti({ pageIndex, pageSize, sort, query }))
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

  const columns = useMemo(
      () => [
          {
              header: 'Id',
              accessorKey: 'id_cliente',
              cell: (props) => <ClientiColumn row={props.row.original} />,
          },
          {
              header: 'Cliente',
              accessorKey: 'cliente',
          },
          {
            header: 'Indirizzo',
            accessorKey: 'indirizzo',
          },
          {
            header: 'Cap',
            accessorKey: 'cap',
          },
          {
            header: 'Città',
            accessorKey: 'citta',
          },
          {
            header: 'Prov.',
            accessorKey: 'provincia',
          },
          {
            header: 'Email',
            accessorKey: 'email',
          },
          {
            header: 'Telefono',
            accessorKey: 'telefono',
          },                                                              
          {
            header: 'Partita IVA',
            accessorKey: 'partita_iva',
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

export default ClientiTable