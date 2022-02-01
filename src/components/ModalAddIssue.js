import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { validateIssue } from './validateInfo'

function ModalAddIssue({ setModalOpen, changeIsChangedIssueList }) {
  const { userData } = useContext(AuthContext)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newIssue, setNewIssue] = useState({
    name: '',
    priority: false,
    additionalInfo: '',
    whoIntroduced: `${userData.firstName} ${userData.lastName}`,
    dateIntroduced: ''
  })

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      axios.post('http://localhost:4000/issues', newIssue)
        .then((response) => {
        if (response.data.status === 'ok') {
          setModalOpen(false)
          changeIsChangedIssueList(true)
        } else {
          alert(response.data.error)
        }
      })
    }
  }, [formErrors])

  const handleSubmit = e => {
    e.preventDefault()
    setFormErrors(validateIssue(newIssue))
    let now = new Date().toLocaleString('pl')
    setNewIssue({ ...newIssue, dateIntroduced: now })
    setIsSubmitting(true)
  }

  return (
    <div className='modal-background'>
      <div className='modal'>
        <div className="title-close-btn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Dodaj nowe zgłoszenie</h1>
        </div>
        <div className='body'>
          <div className='container'>
            <div className='container-item'>
              <label className='new-label'>Nazwa zgłoszenia</label>
              <input
                className='input-large'
                type='text'
                placeholder='Podaj nazwę'
                value={newIssue.name}
                onChange={e => setNewIssue({ ...newIssue, name: e.target.value })}
              />
            </div>
            <div className='container-item'>
              <label className='new-label'>Dodatkowe informacje</label>
              <input
                className='input-large'
                type='textarea'
                placeholder='Podaj dodatkową informacje'
                value={newIssue.additionalInfo}
                onChange={e => setNewIssue({ ...newIssue, additionalInfo: e.target.value })}
              />
            </div>
            <div className='container-item-row'>
              <label className='new-label-checkbox'>Priorytet</label>
              <input
                className='checkbox'
                type='checkbox'
                value={newIssue.priority}
                onChange={e => setNewIssue({ ...newIssue, priority: e.target.checked })}
              />
            </div>
          </div>
        </div>
        <div className='footer'>
          {formErrors && (
            <>
              <p className='new-label-error'>{formErrors.name}</p>
            </>
          )}
          <div className='footer-btn'>
            <button onClick={handleSubmit}>
              Dodaj
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ModalAddIssue