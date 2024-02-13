import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getAggiornamenti, setTableData } from '../store/dataSlice'
import {
    setSelectedRows,
} from '../store/stateSlice'

import cloneDeep from 'lodash/cloneDeep'

const AggiornamentiTable = () => {

  const tableRef = useRef(null)

  const dispatch = useDispatch()

  const { pageIndex, pageSize, sort, query, total } = useSelector(
      (state) => state.trackingAggiornamenti.data.tableData
  )
  const loading = useSelector((state) => state.trackingAggiornamenti.data.loading)

  const data = useSelector((state) => state.trackingAggiornamenti.data.orderList)

  const fetchData = useCallback(() => {
      dispatch(getAggiornamenti({ pageIndex, pageSize, sort, query }))
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
            accessorKey: 'id_aggiornamento',
          },
          {
            header: 'Data',
            accessorKey: 'data_aggiornamento_format',
          },
          {
            header: 'Descrizione',
            accessorKey: 'descrizione',
          },          
          {
            header: 'Sel.',
            accessorKey: 'qta_selezionata',
          },
          {
            header: 'Agg.',
            accessorKey: 'qta_aggiornata',
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
          onIndeterminateCheckBoxChange={onAllRowSelect}

      />
  )
}

export default AggiornamentiTable