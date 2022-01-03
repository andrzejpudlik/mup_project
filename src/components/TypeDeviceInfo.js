import React, { useEffect, useState } from 'react'
import axios from 'axios'


function TypeDeviceInfo({ formData, setFormData }) {
  const [typeDevices, setTypeDevices] = useState([])
  const [newTypeDevice, setNewTypeDevice] = useState('')
  const [errors, setErrors] = useState('')
  const [active, setActive] = useState(null)

  async function getTypeDevices() {
    const typeDevicesResponse = await axios.get('http://localhost:4000/type_devices')
      setTypeDevices(typeDevicesResponse.data)
  }

  useEffect(() => {
    getTypeDevices()
  }, [])

  const handleClick = type => {
    setActive(type)
    setFormData({ ...formData, type })
  }

  const renderTypeDevices = () => {
    return typeDevices.map((device, i) => {
      return (
        <li
          className={device.type === active ? 'type-item' : 'type-item active'}
          key={i}
          onClick={() => handleClick(device.name)}
        >
          {device.name}
        </li>
      )
    })
  }

  const createTypeDevice = async () => {
    if (newTypeDevice.length < 6) {
      const error = 'Nazwa musi mieć przynajmniej 6 znaków'
      setErrors(error)
    } else {
      await axios.post('http://localhost:4000/type_devices', {
        name: newTypeDevice
      })
      getTypeDevices()
    }
  }
  return (
    <>
      <div className='container'>
        <ul className='type-list'>{renderTypeDevices()}</ul>
      </div>
      <div className='new_type-container'>
        <input
          className='new_type-input'
          type='text' 
          placeholder='Dodaj nowy typ urządzenia'
          onChange={e => setNewTypeDevice(e.target.value)}
        />
        {errors && <p className='new-label-error'>{errors}</p>}
        <button
          className='new_type-button'
          onClick={createTypeDevice}
        >
        Dodaj
        </button>
      </div>
    </>
  )
}

export default TypeDeviceInfo
