import React, { useEffect, useMemo, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import axios from 'axios'

function ModalAddDeviceToUser({ setModalOpen, username }) {
  const [devices, setDevices] = useState([])
  const [deviceReadyToAdd, setDeviceReadyToAdd] = useState(null)
  const titleDevice = ['Etykieta', 'Typ urządzenia', 'Model', 'Kto wprowadził']

  const fetchDevices = async () => {
    const response = await axios.get('http://localhost:4000/devices/unallocated')
      .catch((err) => alert(err))

    if (response) {
	   const { length } = response.data
	   let newArray = []

      for ( let i = 0; i < length; i++ ) {
        const { label, type, model, whoIntroduced } = response.data[i]
        newArray.push({ label, type, model, whoIntroduced })
      }
      const devices = newArray
      setDevices(devices)
    }
  }

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

  const {
    canNextPage,
    canPreviousPage,
    getTableBodyProps,
    prepareRow,
    page,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns: devicesColumns,
      data: devicesData,
      initialState: { pageSize: 7 },
    },
    usePagination
  )

  const handleClick = label => {
    setDeviceReadyToAdd(label)
  }

  const submitDeviceToUser = () => {
    if (deviceReadyToAdd) {
      axios.patch('http://localhost:4000/user_active/set_device', {
        username,
        deviceToAssign: deviceReadyToAdd
      }).then((response) => {
        if (response.data.status === 'ok') {
          setDeviceReadyToAdd(null)
          setModalOpen(false)
        } else {
          alert('Wystąpił błąd, spróbuj ponownie')
        }
      })
    } else {
      alert('Nie wybrano żadnego urządzenia')
    }
  }

  useEffect(() => {
    fetchDevices()
  }, [])

  return (
    <div className='modal-background'>
      <div className='modal'>
        <div className="title-close-btn">
          <button
            onClick={() => {
              setModalOpen(false)
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Nieprzypisane urządzenia</h1>
        </div>
        <div className='body'>
          <div className='container'>
            <table className='container-table'>
              <thead>
                  <tr>
                    {titleDevice.map((title) => {
                      return <th key={title}>{title}</th>
                    })}
                  </tr>
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row)
                  
                  return (
                    <tr
                      {...row.getRowProps()}
                      onClick={() => handleClick(row.values.label)}
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
              <span>
                Strona{' '}
                <strong>
                  {pageIndex + 1} z {pageOptions.length}
                </strong>
              </span>
              <button onClick={() => previousPage()} disabled={!canPreviousPage}>Poprzedni</button>
              <button onClick={() => nextPage()} disabled={!canNextPage}>Następny</button>
            </div>
          </div>
        </div>
        <div className='footer'>
          <div className='footer-btn'>
            <button onClick={submitDeviceToUser}>
              Dodaj
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAddDeviceToUser
