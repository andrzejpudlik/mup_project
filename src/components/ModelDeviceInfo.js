import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ModelDeviceInfo({ formData, setFormData, changeIsLabelUnique }) {

  const [labelDevices, setLabelDevices] = useState([])
  const [isCorrectLabel, setIsCorrectLabel] = useState(null)

  async function getLabelDevices() {
    const devicesResponse = await axios.get('http://localhost:4000/devices')
    let newArray = []
    const { length } = devicesResponse.data

    for ( let i = 0; i < length; i++ ) {
      const { label } = devicesResponse.data[i]
      if (formData.label === label) {
        setIsCorrectLabel(false)
      }
      newArray.push(label)
    }
    setLabelDevices(newArray)
  }

  useEffect(() => {
    getLabelDevices()
  }, [])

  const handleChange = e => {
    labelDevices.filter(label => {
      if ((label && e.target.value.length > 1) !== e.target.value) {
        setFormData({ ...formData, label: e.target.value })
        setIsCorrectLabel(true)
        changeIsLabelUnique(true)
      }
      if (label === e.target.value) {
        setTimeout(() => {
          setIsCorrectLabel(false)
          changeIsLabelUnique(false)
        }, 100);
      }
    })
  }

  return (
    <div className='container'>
      <div className='container-item'>
        <label className='new-label'>Numer inwentarzowy</label>
        <input
          className='new_type-input'
          type='text' 
          placeholder='Podaj numer inwentarzowy'
          value={formData.label}
          onChange={handleChange}
        />
        {isCorrectLabel === false ? (
          <span className='new-label-error'>Taki numer inwentarzowy już istnieje</span>
          ) : null}
      </div>
      <div className='container-item'>
        <label className='new-label'>Model</label>
        <input
          className='new_type-input'
          type='text' 
          placeholder='Podaj model urządzenia'
          value={formData.model}
          onChange={e => setFormData({ ...formData, model: e.target.value })}
        />
      </div>
    </div>
  )
}

export default ModelDeviceInfo
