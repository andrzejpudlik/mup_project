import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useGlobalFilter, useTable, usePagination } from 'react-table'
import { GlobalFilter } from './GlobalFilter'

export default function UserList({ changeUserActive, setIsEditable, isChangedUserList, setIsChangedUserList }) {
  const [users, setUsers] = useState([])
  const titleUser = ['Imię', 'Nazwisko', 'Email', 'Telefon', 'Dodatkowe informacje']
  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:4000/users')
      .catch((err) => console.log(err))

    if (response) {
	   const { length } = response.data
	   let newArray = []

      for ( let i = 0; i < length; i++ ) {
        const { firstName, lastName, email, phone, additionalInfo } = response.data[i]
        newArray.push({ firstName, lastName, email, phone, additionalInfo })
      }
      const users = newArray
      setUsers(users)
      setIsChangedUserList(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [isChangedUserList])


  const usersData = useMemo(() => [...users], [users])

  const usersColumns = useMemo(
    () =>
    users[0]
        ? Object.keys(users[0])
           .filter((key) => key !== "rating")
             .map((key) => {
              return { Header: key, accessor: key }
            }) 
        : [],
    [users]
  );

  const tableInstance = useTable(
    {
      columns: usersColumns,
      data: usersData,
      initialState: { pageSize: 11 },
    },
    useGlobalFilter,
    usePagination
  )

  const {
    canNextPage,
    canPreviousPage,
    getTableProps,
    getTableBodyProps,
    page,
    nextPage,
    previousPage,
    pageOptions,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = tableInstance

  const handleClick = email => {
    changeUserActive(email)
    setIsEditable(false)
  }

  return (
    <div className='container-list'>
      <div>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <table className='container-table'{...getTableProps()}>
        <thead>
            <tr>
              {titleUser.map((title) => {
                return <th key={title}>{title}</th>
              })}
            </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                onClick={() => handleClick(row.values.email)}
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
      </div>
      <div className='container-pagination'>
        <span>
          Strona{' '}
          <strong>
            {pageIndex + 1} z {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
      </div>
    </div>
  );
}