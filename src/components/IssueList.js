import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useGlobalFilter, usePagination, useTable } from 'react-table'
import { GlobalFilter } from './GlobalFilter'

function IssueList({ changeIssueActive, changeIssueStatus, setIsEditable, isChangedIssueList, setIsChangedIssueList }) {
  const [issues, setIssues] = useState([])
  const [issuesInactive, setIssuesInactive] = useState([])
  const [changeIssues, setChangeIssues] = useState(false)
  const titleIssue = ['Numer zgłoszenia', 'Nazwa', 'Kto zgłosił', 'Data zgłoszenia']
  const fetchIssues = async () => {
    const response = await axios.get('http://localhost:4000/issues')
      .catch((err) => console.log(err))
    
    if (response) {
	    const { length } = response.data
	    let newArrayActive = []
      let newArrayInactive = []

      for ( let i = 0; i < length; i++ ) {
        if (response.data[i].status === 'Aktywny') {
          const { issueNumber, name, whoIntroduced, dateIntroduced } = response.data[i]
          newArrayActive.push({ issueNumber, name, whoIntroduced, dateIntroduced })
        } else {
          const { issueNumber, name, whoIntroduced, dateIntroduced } = response.data[i]
          newArrayInactive.push({ issueNumber, name, whoIntroduced, dateIntroduced })
        }
      }
      const issuesActive = newArrayActive
      const issuesInactive = newArrayInactive
      setIssues(issuesActive)
      setIssuesInactive(issuesInactive)
      setIsChangedIssueList(false)
    }
  }

  useEffect(() => {
    fetchIssues()
  }, [isChangedIssueList])


  const issuesActiveData = useMemo(() => [...issues], [issues])

  const issuesActiveColumns = useMemo(
    () =>
    issues[0]
        ? Object.keys(issues[0])
           .filter((key) => key !== "rating")
             .map((key) => {
              return { Header: key, accessor: key }
            }) 
        : [],
    [issues]
  );

  const issuesInactiveData = useMemo(() => [...issuesInactive], [issuesInactive])

  const issuesInactiveColumns = useMemo(
    () =>
    issuesInactive[0]
        ? Object.keys(issuesInactive[0])
           .filter((key) => key !== "rating")
             .map((key) => {
              return { Header: key, accessor: key }
            }) 
        : [],
    [issuesInactive]
  );

  const tableInstanceActive = useTable(
    {
      columns: issuesActiveColumns,
      data: issuesActiveData,
    },
    useGlobalFilter,
    usePagination
  )

  const tableInstanceInactive = useTable(
    {
      columns: issuesInactiveColumns,
      data: issuesInactiveData,
    },
    useGlobalFilter,
    usePagination
  )

  const handleChangeIssues = () => {
    setChangeIssues(!changeIssues)
    changeIssueActive(null)
  }

  const handleClick = issueNumber => {
    changeIssueActive(issueNumber)
    if (changeIssues) {
      changeIssueStatus('Nieaktywny')
    } else {
      changeIssueStatus('Aktywny')
    }
    setIsEditable(false)
  }

  return (
    <div className='container-list'>
      <div>
        <div className='search-list'>
          <button onClick={handleChangeIssues}>{changeIssues ? 'Powrót' : 'Historia zgłoszeń'}</button>
          {changeIssues ? (
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
        {changeIssues ? (
          <table className='container-table'{...tableInstanceInactive.getTableProps()}>
            <thead>
                <tr>
                  {titleIssue.map((title) => {
                    return <th key={title}>{title}</th>
                  })}
                </tr>
            </thead>
            <tbody {...tableInstanceInactive.getTableBodyProps()}>
              {tableInstanceInactive.page.map((row) => {
                tableInstanceInactive.prepareRow(row);

                return (
                  <tr
                    {...row.getRowProps()}
                    onClick={() => handleClick(row.values.issueNumber)}
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
        ) : (
          <table className='container-table'{...tableInstanceActive.getTableProps()}>
            <thead>
                <tr>
                  {titleIssue.map((title) => {
                    return <th key={title}>{title}</th>
                  })}
                </tr>
            </thead>
            <tbody {...tableInstanceActive.getTableBodyProps()}>
              {tableInstanceActive.page.map((row) => {
                tableInstanceActive.prepareRow(row);

                return (
                  <tr
                    {...row.getRowProps()}
                    onClick={() => handleClick(row.values.issueNumber)}
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
        )}
      </div>
      {changeIssues ? (
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

export default IssueList