import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import Layout from '../components/Layout'
import { validateProfileInfo } from '../components/validateInfo'

function Profile() {
  const { userData, setUserData } = useContext(AuthContext)
  const [profileEditInfo, setProfileEditInfo] = useState(userData)
  const [isActiveChangeUserPassword, setIsActiveChangeUserPassword] = useState(false)
  const [isActiveSetting, setIsActiveSetting] = useState(false)
  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmittingUpdate) {
        axios.patch(('http://localhost:4000/profile/update_info'), {
          username: userData.username, 
          email: userData.email,
          profileEditInfo
      }).then((response) => {
        console.log(response);
        if (response.data.status === 'ok') {
          setUserData(response.data.newInfo)
          setIsActiveSetting(false)
          setIsSubmittingUpdate(false)

        } else if (response.data.status === 'error') {
          alert(response.data.error)
        } else {
          alert('Wystąpił błąd, spróbuj ponownie')
        }
      })
    }
  }, [formErrors])

  const handleChange = e => {
    const { name, value } = e.target
    setProfileEditInfo({
      ...profileEditInfo,
      [name]: value
    })
  }

  const handleClick = () => {
    if(isActiveSetting) {
      console.log(profileEditInfo);
      setFormErrors(validateProfileInfo(profileEditInfo))
      setIsSubmittingUpdate(true)
    } else {
      setIsActiveSetting(true)
    }
  }

  const handleChangePassword = () => {
    setIsActiveChangeUserPassword(!isActiveChangeUserPassword)
  }

  const changeUserPassword = () => {
    console.log('klik');
  }
  return (
    <Layout>
      <div className='user-info'>
        <div className='header-user-info'>
          <h1>Ustawienia konta</h1>
          <button className='btn-primary' onClick={handleChangePassword}>Zmień hasło</button>
        </div>

        <div className='form_setting_inputs'>
          <div className='list_setting'>
            <p>Nazwa: </p>
            <p>{userData.username}</p>
            {isActiveSetting && (
              <input 
                className='profile-input'
                type='text'
                name='username'
                value={profileEditInfo.username}
                onChange={handleChange} 
              />
            )}
          </div>
          <div className='list_setting'>
            <p>Imię: </p>
            <p>{userData.firstName}</p>
            {isActiveSetting && (
            <input 
              className='profile-input'
              type='text'
              name='firstName'
              value={profileEditInfo.firstName}
              onChange={handleChange}
            />
            )}
          </div>
          <div className='list_setting'>
            <p>Nazwisko: </p>
            <p>{userData.lastName}</p>
            {isActiveSetting && (
            <input 
              className='profile-input'
              type='text'
              name='lastName'
              value={profileEditInfo.lastName}
              onChange={handleChange}
            />
            )}
          </div>
          <div className='list_setting'>
            <p>Email: </p>
            <p>{userData.email}</p>
            {isActiveSetting && (
            <input 
              className='profile-input'
              type='text'
              name='email' 
              value={profileEditInfo.email}
              onChange={handleChange} 
            />
            )}
          </div>
          <div className='list_setting'>
            <p>Telefon: </p>
            <p>{userData.phone}</p>
            {isActiveSetting && (
              <input 
                className='profile-input'
                type='text'
                name='phone'
                value={profileEditInfo.phone}
                onChange={handleChange} 
              />
            )}
          </div>
          <div className='list_setting'>
            <div className='footer-info'>
              <button className='btn-primary' onClick={handleClick}>
                {!isActiveSetting ? 'Zmień dane' : 'Zapisz dane'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
