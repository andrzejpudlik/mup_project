import React, { useState } from 'react'
import axios from 'axios'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { RiFileAddLine } from 'react-icons/ri'
import { FiSave } from 'react-icons/fi'
import { GiCancel } from 'react-icons/gi'
import Layout from '../components/Layout'
import ModalAddDevice from '../components/ModalAddDevice'
import DeviceList from '../components/DeviceList'
import DeviceInfo from '../components/DeviceInfo'

import '../styles/Devices.css'

function Devices() {

  const [modalOpen, setModalOpen] = useState(false)
  const [deviceActive, setDeviceActive] = useState(null)
  const [isEditable, setIsEditable] = useState(false)
  const [isChangedDeviceList, setIsChangedDeviceList] = useState(false)

  const handleClick = () => {
    setModalOpen(true)
  }
 
  const handleDeleteDevice = () => {
    const confirmDeleteDevice = window.confirm(`Czy na pewno chcesz usunąć urządzenie ${deviceActive}`)
    if (confirmDeleteDevice) {
      axios.post('http://localhost:4000/device_active_delete', {
        label: deviceActive
      }).then((response) => {
        console.log(response.data);
        if (response.data.status === 'delete') {
          setIsChangedDeviceList(true)
          setDeviceActive(null)
        } else {
          alert('Wystąpił błąd, spróbuj ponownie')
        }
      })
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
            {deviceActive ? (
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
                  onClick={handleDeleteDevice}
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

        <div className='container-device-all-info'>
          <DeviceList 
            changeDeviceActive={deviceActive => setDeviceActive(deviceActive)}
            setIsEditable={setIsEditable}
            isChangedDeviceList={isChangedDeviceList}
            setIsChangedDeviceList={setIsChangedDeviceList}
          />
          <DeviceInfo deviceActive={deviceActive} isEditable={isEditable} />
        </div>
      </Layout>
      {modalOpen && <ModalAddDevice 
        setModalOpen={setModalOpen} 
        changeIsChangedDeviceList={isChangedDeviceList => setIsChangedDeviceList(isChangedDeviceList)}
        />
      }
    </>
  )
}

export default Devices

