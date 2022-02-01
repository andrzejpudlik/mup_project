import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaUserCog } from 'react-icons/fa'
import { CgAdd } from 'react-icons/cg'
import ModalAddDeviceToUser from './ModalAddDeviceToUser'

function UserInfo({ userActive, isEditable, userEditInfo, setUserEditInfo, isSubmittingUpdate }) {
  const [userInfo, setUserInfo] = useState([])
  const [userDevice, setUserDevice] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const titleDevice = ['Etykieta', 'Typ urządzenia', 'Model']

  const fetchActiveUser = async () => {
    if (userActive) {
      const response = await axios.post('http://localhost:4000/user_active', {
        email: userActive
      })
      if (response) {
        setUserInfo(response.data.activeUser)
        setUserEditInfo({ phone: response.data.activeUser.phone, additionalInfo: response.data.activeUser.additionalInfo })
        let newArray = []
        const { length } = response.data.userDevice
  
        for ( let i = 0; i < length; i++ ) {
          const { label, type, model } = response.data.userDevice[i]
          newArray.push({ label, type, model })
        }
        setUserDevice(newArray)
      }
    }
  }

  const handleClick = () => {
    setModalOpen(true)
  }

  useEffect(() => {
    fetchActiveUser()
  }, [userActive, !isSubmittingUpdate, !modalOpen])

  return (
    <>
      <div className='container-info'>
        <div className='title'>
          <FaUserCog />
          <h1>{userInfo.length !== 0 ? `${userInfo.firstName} ${userInfo.lastName}` : 'Użytkownicy'}</h1>
        </div>
        {userInfo.length === 0 ? null : (
          <>
            <div className='device-info'>
              <div className='device-info-list'>
                <div className='device-category'>
                  <p>Imię:</p>
                  <p>Nazwisko:</p>
                </div>
                <div className='device-category-item'>
                  <p>{userInfo.firstName}</p> 
                  <p>{userInfo.lastName}</p>
                </div>
              </div>
              <div className='device-info-list'>
                <div className='device-category'>
                  <p>Email:</p>
                  <p>Telefon:</p>
                </div>
                <div className='device-category-item'>
                <p>{userInfo.email}</p>
                  {!isEditable ? <p>{userInfo.phone}</p> : (
                    <input 
                      className=''
                      type="text"
                      value={userEditInfo.phone} 
                      onChange={e => setUserEditInfo({ ...userEditInfo, phone: e.target.value })}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='large-info-list'>
              <div className='category-large'>
                <p>Dodatkowe informacje:</p>
                {!isEditable ? <p>{userInfo.additionalInfo}</p> : (
                  <input 
                    className=''
                    type="text"
                    value={userEditInfo.additionalInfo} 
                    onChange={e => setUserEditInfo({ ...userEditInfo, additionalInfo: e.target.value })}
                  />
                )}
              </div>
            </div>
            <ul className='nav-device-list'>
              <li>Sprzęt IT</li>
              <li className='nav-list-text' onClick={handleClick}>Dodaj <CgAdd/></li>
            </ul>
            <div>
              <table className='container-table'>
                <thead>
                  <tr>
                    {titleDevice.map((title) => {
                      return <th key={title}>{title}</th>
                    })}
                  </tr>
                </thead>
                {userDevice ? (
                  <tbody>
                    {userDevice.map((device) => {
                      return (
                        <tr key={device.label}>
                          <td>{device.label}</td>
                          <td>{device.type}</td>
                          <td>{device.model}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                ) : null}
              </table>
            </div>
          </>
        )}
      </div>
      {modalOpen && <ModalAddDeviceToUser 
        setModalOpen={setModalOpen}
        username={userInfo.username}
        />
      }
    </>
  )
}

export default UserInfo
