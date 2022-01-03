import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import TypeDeviceInfo from './TypeDeviceInfo'
import ModelDeviceInfo from './ModelDeviceInfo'
import OtherDeviceInfo from './OtherDeviceInfo'
import { validateTypeDeviceInfo, validateModelDeviceInfo, validateOtherDeviceInfo} from '../components/validateInfo'

import '../styles/ModalAddDevice.css'

function ModalAddDevice({ setModalOpen, changeIsChangedDeviceList }) {
  const { userData } = useContext(AuthContext)
  const [page, setPage] = useState(0)
  const [formErrorsTypeInfo, setFormErrorsTypeInfo] = useState({})
  const [formErrorsModelInfo, setFormErrorsModelInfo] = useState({})
  const [formErrorsOtherInfo, setFormErrorsOtherInfo] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValidatedModelInfo, setIsValidatedModelInfo] = useState(false)
  const [isValidatedTypeInfo, setIsValidatedTypeInfo] = useState(false)
  const [isLabelUnique, setIsLabelUnique] = useState(null)

  useEffect(() => {
    if (Object.keys(formErrorsOtherInfo).length === 0 && isSubmitting) {
      console.log(formData);
      axios.post('http://localhost:4000/devices', formData)
        .then((response) => {
        console.log(response)
        if (response.data.status === 'ok') {
          setModalOpen(false)
          changeIsChangedDeviceList(true)
        } else {
          alert(response.data.error)
          setPage(0)
        }
      })
    }
  }, [formErrorsOtherInfo])

  useEffect(() => {
    if (Object.keys(formErrorsTypeInfo).length === 0 && isValidatedTypeInfo) {
      setPage((currPage) => currPage + 1)
    }
  }, [formErrorsTypeInfo])

  useEffect(() => {
    if (Object.keys(formErrorsModelInfo).length === 0 && isValidatedModelInfo && isLabelUnique) {
      setPage((currPage) => currPage + 1)
    }
  }, [formErrorsModelInfo])

  const handleSubmit = e => {
    if (page === 0) {
      e.preventDefault()
        setFormErrorsTypeInfo(validateTypeDeviceInfo(formData.type))
        setIsValidatedTypeInfo(true)
    } else if (page === 1) {
      e.preventDefault()
      setFormErrorsModelInfo(validateModelDeviceInfo(formData.label, formData.model))
      setIsValidatedModelInfo(true)
    } else {
      e.preventDefault()
      let now = new Date().toLocaleString('pl')
      setFormData({ ...formData, dateIntroduced: now })
      setFormErrorsOtherInfo(validateOtherDeviceInfo(formData))
      setIsSubmitting(true)
    }
  }

  const [formData, setFormData] = useState({
    type: '',
    label: '',
    model: '',
    windows: 'Nie dotyczy',
    disk: '',
    processor: '',
    diagonal: '',
    whoIntroduced: `${userData.firstName} ${userData.lastName}`,
    dateIntroduced: ''
  })

  const FormTitles = ["Typ sprzętu", "Numer inwentarzowy i model", "Pozostałe informacje"]

  const PageDisplay = () => {
    if (page === 0) {
      return <TypeDeviceInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <ModelDeviceInfo formData={formData} setFormData={setFormData} changeIsLabelUnique={isLabelUnique => setIsLabelUnique(isLabelUnique)} />;
    } else {
      return <OtherDeviceInfo formData={formData} setFormData={setFormData} />;
    }
  };

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
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className='body'>
          {PageDisplay()}
        </div>
        <div className='footer'>
          <div className='footer-error'>
          {formErrorsOtherInfo && (
            <>
              <p className='new-label-error'>{formErrorsOtherInfo.disk}</p>
              <p className='new-label-error'>{formErrorsOtherInfo.processor}</p>
              <p className='new-label-error'>{formErrorsOtherInfo.diagonal}</p>
            </>
          )}
          {formErrorsModelInfo && (
            <>
              <p className='new-label-error'>{formErrorsModelInfo.label}</p>
              <p className='new-label-error'>{formErrorsModelInfo.model}</p>
            </>
          )}
            {formErrorsTypeInfo && <p className='new-label-error'>{formErrorsTypeInfo.type}</p>}
          </div>
          <div className='footer-btn'>
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
            <button onClick={handleSubmit}>
              {page === FormTitles.length - 1 ? "Wyślij" : "Dalej"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
};

export default ModalAddDevice