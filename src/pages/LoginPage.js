import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import AuthContext from '../context/AuthContext'
import { validateLoginInfo } from '../components/validateInfo'

import '../styles/LoginRegisterPage.css'

function LoginPage() {
  const { getLoggedIn } = useContext(AuthContext)
  let navigate = useNavigate()
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(
    () => {
      async function fetchMyAPI() {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        const response = await axios.post('http://localhost:4000/api/login', values, {
          withCredentials: true
        })
        await getLoggedIn()
          if (response.data.status === 'ok') {
            navigate('/profile')
          } else {
            alert(response.data.error)
          }

      }
    }
    fetchMyAPI()
    },
    [errors]
  );

  const handleChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    setErrors(validateLoginInfo(values))
    setIsSubmitting(true)
  };

  return (
    <Layout>
      <div className='home-container'>
        <div className='form-container'>
          <form onSubmit={handleSubmit} className='form' noValidate>
            <h1>Logowanie</h1>
            <div className='form-inputs'>
              <label className='form-label'>Nazwa użytkownika</label>
              <input
                className='form-input'
                type='text'
                name='username'
                placeholder='Wpisz swoją nazwę użytkownika'
                value={values.username}
                onChange={handleChange}
              />
              {errors.username && <p>{errors.username}</p>}
            </div>
            <div className='form-inputs'>
              <label className='form-label'>Hasło</label>
              <input
                className='form-input'
                type='password'
                name='password'
                placeholder='Wpisz swoje hasło'
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <button className='form-input-btn' type='submit'>
              Zaloguj się
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage
