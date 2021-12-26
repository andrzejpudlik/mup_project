import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'

import { validateLoginInfo } from '../components/validateInfo'

import '../styles/LoginRegisterPage.css'

function LoginPage() {
  
  const [values, setValues] = useState({
    usernameLogin: '',
    passwordLogin: '', 
  });
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        alert('Form success send')
      }
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
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='form' noValidate>
          <h1>Logowanie</h1>
          <div className='form-inputs'>
            <label className='form-label'>Nazwa użytkownika</label>
            <input
              className='form-input'
              type='text'
              name='usernameLogin'
              placeholder='Wpisz swoją nazwę użytkownika'
              value={values.usernameLogin}
              onChange={handleChange}
            />
            {errors.usernameLogin && <p>{errors.usernameLogin}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Hasło</label>
            <input
              className='form-input'
              type='password'
              name='passwordLogin'
              placeholder='Wpisz swoje hasło'
              value={values.passwordLogin}
              onChange={handleChange}
            />
            {errors.passwordLogin && <p>{errors.passwordLogin}</p>}
          </div>
          <button className='form-input-btn' type='submit'>
            Zaloguj się
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default LoginPage
