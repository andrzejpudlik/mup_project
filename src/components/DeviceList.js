import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useGlobalFilter, useSortBy, useTable } from 'react-table'
import { GlobalFilter } from './GlobalFilter'

export default function DeviceList({ changeDeviceActive, setIsEditable, isChangedDeviceList, setIsChangedDeviceList }) {
  const [devices, setDevices] = useState([])
  const titleDevice = ['Etykieta', 'Typ urządzenia', 'Model', 'Kto wprowadził', 'Data wprowadzenia']
  const fetchDevices = async () => {
    const response = await axios.get('http://localhost:4000/devices')
      .catch((err) => console.log(err))

    if (response) {
	   const { length } = response.data
	   let newArray = []

      for ( let i = 0; i < length; i++ ) {
        const { label, type, model, whoIntroduced, dateIntroduced } = response.data[i]
        newArray.push({ label, type, model, whoIntroduced, dateIntroduced })
      }
      const devices = newArray
      setDevices(devices)
      setIsChangedDeviceList(false)
    }
  }

  useEffect(() => {
    fetchDevices()
  }, [isChangedDeviceList])


  const devicesData = useMemo(() => [...devices], [devices])

  const devicesColumns = useMemo(
    () =>
      devices[0]
        ? Object.keys(devices[0])
           .filter((key) => key !== "rating")
             .map((key) => {
              return { Header: key, accessor: key }
            }) 
        : [],
    [devices]
  );

  const tableInstance = useTable(
    {
      columns: devicesColumns,
      data: devicesData,
    },
    useGlobalFilter,
    useSortBy
  )

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance

  const handleClick = label => {
    changeDeviceActive(label)
    setIsEditable(false)
  }

  return (
    <div className='container-device-list'>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <table className='container-table'{...getTableProps()}>
        <thead>
            <tr>
              {titleDevice.map((title) => {
                return <th key={title}>{title}</th>
              })}
            </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                onClick={() => handleClick(row.values.label)}
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
    </div>
  );
}