import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getListini, setTableData } from '../store/dataSlice'
import {
    setSelectedRows,
} from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import { useParams } from 'react-router-dom'


const ListiniTable = () => {
  const { listinoId } = useParams();  // Estrai l'ID dall'URL
  const tableRef = useRef(null)

  const dispatch = useDispatch()

  const { pageIndex, pageSize, sort, query, total } = useSelector(
      (state) => state.crmListiniPv.data.tableData
  )
  const loading = useSelector((state) => state.crmListiniPv.data.loading)

  const data = useSelector((state) => state.crmListiniPv.data.orderList)

  const fetchData = useCallback(() => {
      dispatch(getListini({ pageIndex, pageSize, sort, query, id: listinoId }))
  }, [dispatch, pageIndex, pageSize, sort, query, listinoId])

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
                header: 'Nazione',
                accessorKey: 'nazione',
                cell: (props) => {
                    const row = props.row.original
                    return <div className="uppercase text-black">{row.nazione}</div>
                },                
            },
            {
                header: 'Fascia',
                columns: [
                    {
                        header: 'CAP',
                        accessorKey: 'id_gruppo_cap',
                        cell: (props) => {
                            const row = props.row.original
                            return <div className="text-sm flex justify-center font-bold">{row.id_gruppo_cap}</div>
                        },
                        meta: {
                            align: 'center'
                        } 
                    }
                ],
                meta: {
                    align: 'center',
                }                                                
            },
            {
                header: '0-200 kg',
                columns: [
                    {
                        header: 'Ogni 100 Kg',
                        accessorKey: 'fascia_1',
                        cell: (props) => {
                            const row = props.row.original
                            return <div className="text-sm flex justify-center">€ {row.fascia_1}</div>
                        },
                        meta: {
                            align: 'center'
                        } 
                    }
                ],
                meta: {
                    align: 'center',
                }                                             
            },
            {
                header: '201-500 kg',
                columns: [
                    {
                        header: 'Ogni 100 Kg',
                        accessorKey: 'fascia_2',
                        cell: (props) => {
                            const row = props.row.original
                            return <div className="text-sm flex justify-center">€ {row.fascia_2}</div>
                        },
                        meta: {
                            align: 'center'
                        } 
                    }
                ],
                meta: {
                    align: 'center',
                }                                                
            },
            {
                header: '501-1000 kg',
                columns: [
                    {
                        header: 'Ogni 100 Kg',
                        accessorKey: 'fascia_3',
                        cell: (props) => {
                            const row = props.row.original
                            return <div className="text-sm flex justify-center">€ {row.fascia_3}</div>
                        },
                        meta: {
                            align: 'center'
                        } 
                    }
                ],
                meta: {
                    align: 'center',
                }                                                                  
            },
            {
                header: '1001-2000 kg',
                columns: [
                    {
                        header: 'Ogni 100 Kg',
                        accessorKey: 'fascia_4',
                        cell: (props) => {
                            const row = props.row.original
                            return <div className="text-sm flex justify-center">€ {row.fascia_4}</div>
                        },
                        meta: {
                            align: 'center'
                        } 
                    }
                ],
                meta: {
                    align: 'center',
                }                                                                  
            },
            {
                header: 'Oltre 2000 kg',
                columns: [
                    {
                        header: 'Ogni 100 Kg',
                        accessorKey: 'fascia_5',
                        cell: (props) => {
                            const row = props.row.original
                            return <div className="text-sm flex justify-center">€ {row.fascia_5}</div>
                        },
                        meta: {
                            align: 'center'
                        } 
                    }
                ],
                meta: {
                    align: 'center',
                }                                                  
            },
            {
                header: 'Tempi di consegna in giorni lav',
                columns: [
                  {
                    header: () =>  {return <div className="text-red-600">Standard</div>},
                    accessorKey: 'consegna_standard',
                    cell: (props) => {
                        const row = props.row.original
                        return <div className="text-sm flex justify-center">{row.consegna_standard}</div>
                    },                
                    meta: {
                        align: 'center'
                    }    
                  },
                  {
                    header: () =>  {return <div className="text-red-600">Espresso</div>},
                    accessorKey: 'consegna_espresso',
                    cell: (props) => {
                        const row = props.row.original
                        return <div className="text-sm flex justify-center">{row.consegna_espresso}</div>
                    },                
                    meta: {
                        align: 'center'
                    }     
                  },
                ],
                meta: {
                    align: 'center',
                }               
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

export default ListiniTable