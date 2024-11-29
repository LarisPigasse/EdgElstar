import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { Tooltip, Avatar, } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getListini, setTableData } from '../store/dataSlice'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
    setDataListini,
    toggleModalUpdateListini
} from '../store/stateSlice'
import { useNavigate } from 'react-router-dom'
import useThemeClass from 'utils/hooks/useThemeClass'
import cloneDeep from 'lodash/cloneDeep'
import { Link } from 'react-router-dom'

const ListiniColumn = ({ row }) => {
  const { textTheme } = useThemeClass()
  const navigate = useNavigate()

  const onView = useCallback(() => {
    navigate(`/crm/listini-peso-volume/${row.id_listino}`)
  }, [navigate, row])

  return (
      <span
          className={`cursor-pointer select-none hover:${textTheme}`}
          onClick={onView}
      >
          <span className=' text-sky-500 font-semibold '>{row.id_listino}</span>
      </span>
  )

}

const ActionColumn = ({ row }) => {

  const dispatch = useDispatch()
  const { textTheme } = useThemeClass()

  const onUpdate = () => {
    dispatch(toggleModalUpdateListini(true))
    dispatch(setDataListini(row))
  }

  const onDelete = () => {
      dispatch(setDeleteMode('single'))
      dispatch(setSelectedRow(row.id_listino))
  }

  // const onView = () => {
    //dispatch(toggleModalViewOperatore(true))
    // dispatch(setDataOperatore(row))
  //} 
//   const onView = useCallback(() => {
//       navigate(`/app/sistema/operatori-details/${row.id_operatore}`)
//   }, [navigate, row])

  
  return (
      <div className="flex justify-end text-lg">
          <Tooltip title="Modifica listino">
              <span
                  className="cursor-pointer p-2 hover:text-blue-500"
                  onClick={onUpdate}
              >
                  <HiOutlinePencil />
              </span>
          </Tooltip>
          <Tooltip title="Elimina listino">
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


const ListiniTable = () => {

  const tableRef = useRef(null)

  const dispatch = useDispatch()

  const { pageIndex, pageSize, sort, query, total } = useSelector(
      (state) => state.crmListini.data.tableData
  )
  const loading = useSelector((state) => state.crmListini.data.loading)

  const data = useSelector((state) => state.crmListini.data.orderList)

  const fetchData = useCallback(() => {
      dispatch(getListini({ pageIndex, pageSize, sort, query }))
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


  const DettaglioListino = ({ row }) => {
    const { textTheme } = useThemeClass()
    return (
        <div className="flex items-center">
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/crm/listini-peso-volume/${row.id_listino}`}
            >
                {row.listino}
            </Link>
        </div>
    )
  }

  const columns = useMemo(
      () => [
          {
              header: 'Id',
              accessorKey: 'id_listino',
              cell: (props) => <ListiniColumn row={props.row.original} />,
          },
          {
              header: 'Listino',
              accessorKey: 'listino',
              cell: (props) => {
                const row = props.row.original
                return <DettaglioListino row={row} />
            },               
          },
          {
            header: 'Data creazione',
            accessorKey: 'data_listino_format',
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

export default ListiniTable