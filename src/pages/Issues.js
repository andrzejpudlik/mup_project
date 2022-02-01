import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { RiFileAddLine } from 'react-icons/ri'
import { FiSave } from 'react-icons/fi'
import { GiCancel } from 'react-icons/gi'
import Layout from '../components/Layout'
import ModalAddIssue from '../components/ModalAddIssue'
import IssueList from '../components/IssueList'
import IssueInfo from '../components/IssueInfo'
import { validateIssue } from '../components/validateInfo'

function Issues() {
  const [modalOpen, setModalOpen] = useState(false)
  const [issueActive, setIssueActive] = useState(null)
  const [isEditable, setIsEditable] = useState(false)
  const [isChangedIssueList, setIsChangedIssueList] = useState(false)
  const [issueStatus, setIssueStatus] = useState(null)
  const [issueEditInfo, setIssueEditInfo] = useState([])
  const [formErrors, setFormErrors] = useState({})
  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false)

  const handleClick = () => {
    setModalOpen(true)
  }

  const handleDeleteIssue = () => {
    const confirmDeleteIssue = window.confirm(`Czy na pewno chcesz usunąć zgłoszenie ${issueActive}?`)
    if (confirmDeleteIssue) {
      axios.post('http://localhost:4000/issue_active_delete', {
        issueNumber: issueActive
      }).then((response) => {
        if (response.data.status === 'delete') {
          setIsChangedIssueList(true)
          setIssueActive(null)
        } else {
          alert('Wystąpił błąd, spróbuj ponownie')
        }
      })
    }
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmittingUpdate) {
        axios.patch(('http://localhost:4000/issue_active/update_info'), {
        issueNumber: issueActive,
        name: issueEditInfo.name,
        additionalInfo: issueEditInfo.additionalInfo,
      }).then((response) => {
        if (response.data.status === 'ok') {
          setIsEditable(false)
          setIsSubmittingUpdate(false)
        } else {
          alert('Wystąpił błąd, spróbuj ponownie')
        }
      })
    }
  }, [formErrors])

  const updateIssueInfo = () => {
    if (issueEditInfo) {
      setFormErrors(validateIssue(issueEditInfo))
      setIsSubmittingUpdate(true)
    }
  }

  return (
    <>
      <Layout>
        <div className='nav-container'>
          <ul className='nav-list'>
            <li
              className='nav-list-text'
              onClick={handleClick}
            >
              <RiFileAddLine />
              Nowy
            </li>
            {issueActive ? (
              <>
                {issueStatus === 'Aktywny' ? (
                  <li
                    className='nav-list-text'
                    onClick={() => setIsEditable(true)}
                  >
                    <AiFillEdit />
                    Edytuj
                  </li>
                ) : null}
                <li 
                  className='nav-list-text'
                  onClick={handleDeleteIssue}
                >
                  <AiFillDelete />
                  Usuń
                </li>
              </>
            ) : null}
            {isEditable ? (
              <>
                <li 
                  className='nav-list-text'
                  onClick={updateIssueInfo}
                >
                  <FiSave />
                  Zapisz
                </li>
                <li 
                  className='nav-list-text'
                  onClick={() => setIsEditable(false)}
                >
                  <GiCancel />
                  Anuluj
                </li>
              </>
            ) : null}
          </ul>
        </div>
        <div className='container-all-info'>
          <IssueList
            changeIssueActive={issueActive => setIssueActive(issueActive)}
            changeIssueStatus={issueStatus => setIssueStatus(issueStatus)}
            setIsEditable={setIsEditable}
            isChangedIssueList={isChangedIssueList}
            setIsChangedIssueList={setIsChangedIssueList}
          />
          <IssueInfo
            issueActive={issueActive}
            setIssueActive={setIssueActive}
            issueStatus={issueStatus}
            isEditable={isEditable} 
            setIsChangedIssueList={setIsChangedIssueList}
            issueEditInfo={issueEditInfo}
            setIssueEditInfo={setIssueEditInfo}
            isSubmittingUpdate={isSubmittingUpdate}
          />
        </div>
      </Layout>
      {modalOpen && <ModalAddIssue
        setModalOpen={setModalOpen}
        changeIsChangedIssueList={isChangedIssueList => setIsChangedIssueList(isChangedIssueList)}
        />
      }
    </>
  )
}

export default Issues