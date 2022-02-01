import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { RiFileAddLine } from 'react-icons/ri'
import { FiSave } from 'react-icons/fi'
import { GiCancel } from 'react-icons/gi'
import Layout from '../components/Layout'
import ModalAddDemand from '../components/ModalAddDemand'
import DemandList from '../components/DemandList'
import DemandInfo from '../components/DemandInfo'
import { validateDemand } from '../components/validateInfo'

function Demands() {
  const [modalOpen, setModalOpen] = useState(false)
  const [demandActive, setDemandActive] = useState(null)
  const [isEditable, setIsEditable] = useState(false)
  const [isChangedDemandList, setIsChangedDemandList] = useState(false)
  const [demandStatus, setDemandStatus] = useState(null)
  const [demandEditInfo, setDemandEditInfo] = useState([])
  const [formErrors, setFormErrors] = useState({})
  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false)

  const handleClick = () => {
    setModalOpen(true)
  }

  const handleDeleteDemand = () => {
    const confirmDeleteDemand = window.confirm(`Czy na pewno chcesz usunąć urządzenie?`)
    if (confirmDeleteDemand) {
      axios.post('http://localhost:4000/demand_active_delete', {
        label: demandActive
      }).then((response) => {
        if (response.data.status === 'delete') {
          setIsChangedDemandList(true)
          setDemandActive(null)
        } else {
          alert('Wystąpił błąd, spróbuj ponownie')
        }
      })
    }
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmittingUpdate) {
        axios.patch(('http://localhost:4000/demand_active/update_info'), {
        demandActive,
        name: demandEditInfo.name,
        quantity: demandEditInfo.quantity,
        cost: demandEditInfo.cost
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

  const updateDemandInfo = () => {
    if (demandEditInfo) {
      setFormErrors(validateDemand(demandEditInfo))
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
            {demandActive ? (
              <>
                <li
                  className='nav-list-text'
                  onClick={() => setIsEditable(true)}
                >
                  <AiFillEdit />
                  Edytuj
                </li>
                <li 
                  className='nav-list-text'
                  onClick={handleDeleteDemand}
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
                  onClick={updateDemandInfo}
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
          <DemandList 
            changeDemandActive={demandActive => setDemandActive(demandActive)}
            changeDemandStatus={demandStatus => setDemandStatus(demandStatus)}
            setIsEditable={setIsEditable}
            isChangedDemandList={isChangedDemandList}
            setIsChangedDemandList={setIsChangedDemandList}
          />
          <DemandInfo 
            demandActive={demandActive}
            setDemandActive={setDemandActive}
            demandStatus={demandStatus}
            isEditable={isEditable}
            setIsChangedDemandList={setIsChangedDemandList}
            demandEditInfo={demandEditInfo}
            setDemandEditInfo={setDemandEditInfo}
            isSubmittingUpdate={isSubmittingUpdate}
          />
        </div>
      </Layout>
      {modalOpen && <ModalAddDemand 
        setModalOpen={setModalOpen} 
        changeIsChangedDemandList={isChangedDemandList => setIsChangedDemandList(isChangedDemandList)}
        />
      }
    </>
  )
}

export default Demands
