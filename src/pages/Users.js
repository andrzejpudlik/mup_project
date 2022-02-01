import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { FiSave } from 'react-icons/fi'
import { GiCancel } from 'react-icons/gi'
import Layout from '../components/Layout'
import UserList from '../components/UserList'
import UserInfo from '../components/UserInfo'
import { validatePhoneNumber } from '../components/validateInfo'

function Users() {
  const [userActive, setUserActive] = useState(null)
  const [isEditable, setIsEditable] = useState(false)
  const [isChangedUserList, setIsChangedUserList] = useState(false)
  const [userEditInfo, setUserEditInfo] = useState({
    phone: '',
    additionalInfo: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false)

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmittingUpdate) {
        axios.patch(('http://localhost:4000/user_active/update_info'), {
        email: userActive,
        phone: userEditInfo.phone,
        additionalInfo: userEditInfo.additionalInfo
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

  const deleteUser = () => {
    const confirmDeleteDemand = window.confirm(`Czy na pewno chcesz usunąć użytkownika?`)
    if (confirmDeleteDemand) {
      axios.post('http://localhost:4000/user_active_delete', {
        email: userActive
      }).then((response) => {
        if (response.data.status === 'delete') {
          setIsChangedUserList(true)
          setUserActive(null)
        } else {
          alert('Wystąpił błąd, spróbuj ponownie')
        }
      })
    }
  }

  const updateUserInfo = () => {
    if (userEditInfo) {
      setFormErrors(validatePhoneNumber(userEditInfo))
      setIsSubmittingUpdate(true)
    }
  }

  return (
    <Layout>
      <div className='nav-container'>
        <ul className='nav-list'>
          {userActive ? (
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
                onClick={deleteUser}
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
                onClick={updateUserInfo}
              >
                <FiSave/>
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
        <UserList 
          changeUserActive={userActive => setUserActive(userActive)}
          setIsEditable={setIsEditable}
          isChangedUserList={isChangedUserList}
          setIsChangedUserList={setIsChangedUserList}
        />
        <UserInfo 
          userActive={userActive}
          isEditable={isEditable}
          userEditInfo={userEditInfo}
          setUserEditInfo={setUserEditInfo}
          isSubmittingUpdate={isSubmittingUpdate}
        />
      </div>
    </Layout>
  )
}

export default Users
