import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/Layout'
import SignUpInfo from '../components/SignUpInfo'
import PersonalInfo from '../components/PersonalInfo'
import { validateSignUp, validatePersonalInfo } from '../components/validateInfo'

function RegisterPage() {
  let navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: '',
  })
  const [formErrorsSignUp, setFormErrorsSignUp] = useState({})
  const [formErrorsPersonalInfo, setFormErrorsPersonalInfo] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValidatedSignUp, setIsValidatedSignUp] = useState(false)

  const FormTitles = ["Rejestracja", "Dodatkowe informacje"]

  useEffect(() => {
    if (Object.keys(formErrorsSignUp).length === 0 && isValidatedSignUp) {
      setPage((currPage) => currPage + 1)
    }
  }, [formErrorsSignUp])

  useEffect(() => {
    if (Object.keys(formErrorsPersonalInfo).length === 0 && isSubmitting) {
      axios.post('http://localhost:4000/api/register', {
        username: values.username,
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName
      }).then((response) => {
        console.log(response)
        if (response.data.status === 'ok') {
          navigate('/login')
        } else {
          alert(response.data.error)
          setPage(0)
        }
      })
    }
  }, [formErrorsPersonalInfo])

  const handleSubmit = e => {
    if (page === FormTitles.length - 1) {
      e.preventDefault()
      setFormErrorsPersonalInfo(validatePersonalInfo(values))
      setIsSubmitting(true)
    } else {
      e.preventDefault()
      setFormErrorsSignUp(validateSignUp(values))
      setIsValidatedSignUp(true)
    }
  }

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo values={values} setValues={setValues} errors={formErrorsSignUp} />
    }  else if (page !== 0 && isValidatedSignUp) {
      return <PersonalInfo values={values} setValues={setValues} errors={formErrorsPersonalInfo} />
    }
  }

  return (
    <Layout>
      <div className='home-container'>
        <div className='form-container'>
          <div className='form'>
            <h1>{FormTitles[page]}</h1>
            {PageDisplay()}
            <div className='form-input-footer'>
              {page !== 0 ? (
                <button
                  className='form-input-btn'
                  onClick={() => {
                    setPage((currPage) => currPage - 1);
                  }}
                >
                Wstecz
                </button>
              ) : null}
              <button
                className='form-input-btn'
                onClick={handleSubmit}
              >
                {page === FormTitles.length - 1 ? "Rejestracja" : "Dalej"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RegisterPage