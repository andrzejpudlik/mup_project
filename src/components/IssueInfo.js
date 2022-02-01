import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { SiMicrosoftacademic } from 'react-icons/si'
import AuthContext from '../context/AuthContext'

function IssueInfo({ 
    issueActive,
    setIssueActive,
    issueStatus,
    isEditable,
    setIsChangedIssueList,
    issueEditInfo,
    setIssueEditInfo,
    isSubmittingUpdate 
  }) {
  const { userData } = useContext(AuthContext)
  const [issueInfo, setIssueInfo] = useState([])

  const fetchActiveIssue = async () => {
    if (issueActive) {
      const response = await axios.post('http://localhost:4000/issue_active', {
        issueNumber: issueActive
      })
  
      if (response) {
        setIssueInfo(response.data)
        setIssueEditInfo({ name: response.data.name, additionalInfo: response.data.additionalInfo })
      }
    }
  }

  const handleUpdateStatus = async () => {
    let dateClosed = new Date().toLocaleString('pl')
    const response = await axios.patch('http://localhost:4000/issue_active_update_status', {
      issueNumber: issueActive,
      status: 'Nieaktywny',
      dateClosed,
      whoClosed: `${userData.firstName} ${userData.lastName}`
    })
    if (response.data.status === 'ok') {
      setIssueActive(null)
      setIsChangedIssueList(true)
    } else {
      alert('Wystąpił błąd, spróbuj ponownie')
    }
  }

  useEffect(() => {
    fetchActiveIssue()
  }, [issueActive, !isSubmittingUpdate])

  return (
    <div className='container-info'>
      <div className='title'>
        <SiMicrosoftacademic />
        <h1>{issueActive ? `Zgłoszenie: ${issueActive}` : 'Zgłoszenie'}</h1>
      </div>
      {!issueActive ? null : (
        <>
          <div className='device-info'>
            <div className='device-info-list'>
              <div className='device-category'>
                <p>Numer zgłoszenia:</p>
                <p>Priorytet:</p>
              </div>
              <div className='device-category-item'>
                <p>{issueInfo.issueNumber}</p>
                <p>{issueInfo.priority ? 'Tak' : 'Nie'}</p>
              </div>
            </div>
            <div className='device-info-list'>
              <div className='device-category'>
                <p>Kto zgłosił:</p>
                <p>Data zgłoszenia:</p>   
              </div>
              <div className='device-category-item'>
                <p>{issueInfo.whoIntroduced}</p>
                <p>{issueInfo.dateIntroduced}</p>
              </div>
            </div>
          </div>
          <div className='large-info-list'>
            <div className='category-large'>
              <p>Nazwa zgłoszenia:</p>
              {!isEditable ? <p>{issueInfo.name}</p> : (
                <input 
                  className=''
                  type="text"
                  value={issueEditInfo.name} 
                  onChange={e => setIssueEditInfo({ ...issueEditInfo, name: e.target.value })}
                />
              )}
            </div>
            <div className='category-large'>
              <p>Dodatkowe informacje:</p>
              {!isEditable ? <p>{issueInfo.additionalInfo}</p> : (
                <input 
                  className=''
                  type="text"
                  value={issueEditInfo.additionalInfo} 
                  onChange={e => setIssueEditInfo({ ...issueEditInfo, additionalInfo: e.target.value })}
                />
              )}
            </div>
          </div>
          {issueStatus === 'Aktywny' ? (
            <div className='footer-info'>
              <p>Oznacz zgłoszenie jako zamknięte</p>
              <button className='btn-primary' onClick={handleUpdateStatus}>Zamknij zgłoszenie</button>
            </div>
          ) : (
            <div className='footer-info-inactive'>
              <div className='footer-info'>
                <p>Data zamknięcia:</p>
                <p>{issueInfo.dateClosed}</p>
              </div>
              <div className='footer-info'>
                <p>Kto zamknął:</p>
                <p>{issueInfo.whoClosed}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default IssueInfo