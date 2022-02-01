import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { validateDemand } from './validateInfo'

function ModalAddDemand({ setModalOpen, changeIsChangedDemandList }) {
  const { userData } = useContext(AuthContext)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newDemand, setNewDemand] = useState({
    name: '',
    cost: '',
    quantity: 0,
    whoIntroduced: `${userData.firstName} ${userData.lastName}`,
    dateIntroduced: ''
  })


  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      axios.post('http://localhost:4000/demands', newDemand)
        .then((response) => {
        console.log(response)
        if (response.data.status === 'ok') {
          setModalOpen(false)
          changeIsChangedDemandList(true)
        } else {
          alert(response.data.error)
        }
      })
    }
  }, [formErrors])

  const handleSubmit = e => {
    e.preventDefault()
    setFormErrors(validateDemand(newDemand))
    let now = new Date().toLocaleString('pl')
    setNewDemand({ ...newDemand, dateIntroduced: now })
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
        <div className='title'>
          <h1>Dodaj nowe zapotrzebowanie</h1>
        </div>
        <div className='container'>
          <div className='container-item'>
            <label className='new-label'>Nazwa zapotrzebowania</label>
            <input
              className='input-large'
              type='text'
              placeholder='Podaj nazwę'
              value={newDemand.name}
              onChange={e => setNewDemand({ ...newDemand, name: e.target.value })}
            />
          </div>
          <div className='container-item'>
            <label className='new-label'>Ilość</label>
            <input
              className='new_type-input'
              type='number'
              placeholder='Podaj ilość'
              value={newDemand.quantity}
              onChange={e => setNewDemand({ ...newDemand, quantity: e.target.value })}
            />
          </div>
          <div className='container-item'>
            <label className='new-label'>Szacunkowy koszt</label>
            <input
              className='new_type-input'
              type='text'
              placeholder='Podaj szacunkowy koszt'
              value={newDemand.cost}
              onChange={e => setNewDemand({ ...newDemand, cost: e.target.value })}
            />
          </div>
        </div>
        <div className='footer'>
          {formErrors && (
            <>
              <p className='new-label-error'>{formErrors.name}</p>
              <p className='new-label-error'>{formErrors.quantity}</p>
              <p className='new-label-error'>{formErrors.cost}</p>
            </>
          )}
          <div className='footer-btn'>
            <button onClick={handleSubmit}>
              Wyślij
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ModalAddDemand