import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useGlobalFilter, usePagination, useTable } from 'react-table'
import { GlobalFilter } from './GlobalFilter'

function DemandList({ changeDemandActive, changeDemandStatus, setIsEditable, isChangedDemandList, setIsChangedDemandList }) {
  const [demandsActive, setDemandsActive] = useState([])
  const [demandsInactive, setDemandsInactive] = useState([])
  const [changeDemands, setChangeDemands] = useState(false)
  const titleDemand = ['Nazwa', 'Ilość', 'Szacunkowy koszt', 'Wnioskodawca', 'Data wprowadzenia']
  const fetchDevices = async () => {
    const response = await axios.get('http://localhost:4000/demands')
      .catch((err) => console.log(err))

    if (response) {
      console.log(response.data);
	    const { length } = response.data
      let newArrayActive = []
      let newArrayInactive = []

      for ( let i = 0; i < length; i++ ) {
        if (response.data[i].status === 'Aktywny') {
          const { name, quantity, cost, whoIntroduced, dateIntroduced } = response.data[i]
          newArrayActive.push({ name, quantity, cost, whoIntroduced, dateIntroduced })
        } else {
          const { name, quantity, cost, whoIntroduced, dateIntroduced } = response.data[i]
          newArrayInactive.push({ name, quantity, cost, whoIntroduced, dateIntroduced })
        }
      }
      const demandsActive = newArrayActive
      const demandsInactive = newArrayInactive
      setDemandsActive(demandsActive)
      setDemandsInactive(demandsInactive)
      setIsChangedDemandList(false)
    }
  }

  useEffect(() => {
    fetchDevices()
  }, [isChangedDemandList])


  const demandsActiveData = useMemo(() => [...demandsActive], [demandsActive])

  const demandsActiveColumns = useMemo(
    () =>
    demandsActive[0]
        ? Object.keys(demandsActive[0])
           .filter((key) => key !== "rating")
             .map((key) => {
              return { Header: key, accessor: key }
            }) 
        : [],
    [demandsActive]
  );

  const demandsInactiveData = useMemo(() => [...demandsInactive], [demandsInactive])

  const demandsInactiveColumns = useMemo(
    () =>
    demandsInactive[0]
        ? Object.keys(demandsInactive[0])
           .filter((key) => key !== "rating")
             .map((key) => {
              return { Header: key, accessor: key }
            }) 
        : [],
    [demandsInactive]
  );

  const tableInstanceActive = useTable(
    {
      columns: demandsActiveColumns,
      data: demandsActiveData,
    },
    useGlobalFilter,
    usePagination
  )

  const tableInstanceInactive = useTable(
    {
      columns: demandsInactiveColumns,
      data: demandsInactiveData,
    },
    useGlobalFilter,
    usePagination
  )

  const handleChangeDemands = () => {
    setChangeDemands(!changeDemands)
    changeDemandActive(null)
  }

  const handleClick = (who, date) => {
    const active = {who, date}
    changeDemandActive(active)
    if (changeDemands) {
      changeDemandStatus('Nieaktywny')
    } else {
      changeDemandStatus('Aktywny')
    }
    setIsEditable(false)
  }

  return (
    <div className='container-list'>
      <div>
      <div className='search-list'>
        <button onClick={handleChangeDemands}>{changeDemands ? 'Powrót' : 'Historia zapotrzebowań'}</button>
        {changeDemands ? (
          <GlobalFilter
            preGlobalFilteredRows={tableInstanceInactive.preGlobalFilteredRows}
            setGlobalFilter={tableInstanceInactive.setGlobalFilter}
            globalFilter={tableInstanceInactive.state.globalFilter}
          />
        ) : (
          <GlobalFilter
            preGlobalFilteredRows={tableInstanceActive.preGlobalFilteredRows}
            setGlobalFilter={tableInstanceActive.setGlobalFilter}
            globalFilter={tableInstanceActive.state.globalFilter}
          />
        )}
      </div>
      {changeDemands ? (
        <table className='container-table'{...tableInstanceInactive.getTableProps()}>
          <thead>
              <tr>
                {titleDemand.map((title) => {
                  return <th key={title}>{title}</th>
                })}
              </tr>
          </thead>
          <tbody {...tableInstanceInactive.getTableBodyProps()}>
            {tableInstanceInactive.page.map((row, idx) => {
              tableInstanceInactive.prepareRow(row);

              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => handleClick(row.values.whoIntroduced, row.values.dateIntroduced)}
                >
                  {row.cells.map((cell, idx) => (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table className='container-table'{...tableInstanceActive.getTableProps()}>
          <thead>
              <tr>
                {titleDemand.map((title) => {
                  return <th key={title}>{title}</th>
                })}
              </tr>
          </thead>
          <tbody {...tableInstanceActive.getTableBodyProps()}>
            {tableInstanceActive.page.map((row, idx) => {
              tableInstanceActive.prepareRow(row);

              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => handleClick(row.values.whoIntroduced, row.values.dateIntroduced)}
                >
                  {row.cells.map((cell, idx) => (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      </div>
      {changeDemands ? (
        <div className='container-pagination'>
          <span>
            Strona{' '}
            <strong>
              {tableInstanceInactive.state.pageIndex + 1} z {tableInstanceInactive.pageOptions.length}
            </strong>
          </span>
          <button onClick={() => tableInstanceInactive.previousPage()} disabled={!tableInstanceInactive.canPreviousPage}>{'<'}</button>
          <button onClick={() => tableInstanceInactive.nextPage()} disabled={!tableInstanceInactive.canNextPage}>{'>'}</button>
        </div>
      ) : (
        <div className='container-pagination'>
          <span>
            Strona{' '}
            <strong>
              {tableInstanceActive.state.pageIndex + 1} z {tableInstanceActive.pageOptions.length}
            </strong>
          </span>
          <button onClick={() => tableInstanceActive.previousPage()} disabled={!tableInstanceActive.canPreviousPage}>{'<'}</button>
          <button onClick={() => tableInstanceActive.nextPage()} disabled={!tableInstanceActive.canNextPage}>{'>'}</button>
        </div>
      )}
    </div>
  )
}

export default DemandList