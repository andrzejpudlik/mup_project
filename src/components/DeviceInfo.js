import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdImportantDevices } from 'react-icons/md'

function DeviceInfo({ deviceActive, isEditable }) {
  const [deviceInfo, setDeviceInfo] = useState([])
  const [editDeviceInfo, setEditDeviceInfo] = useState([])

  const fetchActiveDevice = async () => {
    const response = await axios.post('http://localhost:4000/device_active', {
      label: deviceActive
    })

    if (response) {
      setDeviceInfo(response.data)
      setEditDeviceInfo(response.data)
    }
  }

  useEffect(() => {
    fetchActiveDevice()
  }, [deviceActive])

  return (
    <div className='container-info'>
      <div className='title'>
        <MdImportantDevices />
        <h1>{deviceActive ? deviceActive : 'Sprzęt IT'}</h1>
      </div>
      {!deviceInfo ? null : (
        <div className='device-info'>
          <div className='device-info-list'>
            <div className='device-category'>
              <p>Typ sprzętu:</p>
              <p>Numer inwentarzowy:</p>
              <p>Model:</p>
            </div>
            <div className='device-category-item'>
              {!isEditable ? <p>{deviceInfo.type}</p> : (
                <input 
                  className=''
                  type="text"
                  value={editDeviceInfo.type} 
                  onChange={e => setEditDeviceInfo({ ...editDeviceInfo, type: e.target.value })}
                />
              )}
              {!isEditable ? <p>{deviceInfo.label}</p> : (
                <input 
                  className=''
                  type="text"
                  value={editDeviceInfo.label} 
                  onChange={e => setEditDeviceInfo({ ...editDeviceInfo, label: e.target.value })}
                />
              )}
              {!isEditable ? <p>{deviceInfo.model}</p> : (
                <input 
                  className=''
                  type="text"
                  value={editDeviceInfo.model} 
                  onChange={e => setEditDeviceInfo({ ...editDeviceInfo, model: e.target.value })}
                />
              )}
            </div>
          </div>
          <div className='device-info-list'>
            <div className='device-category'>
              <p>Windows:</p>
              <p>Procesor:</p>
              <p>Dysk:</p>
              <p>Przekątna:</p>    
            </div>
            <div className='device-category-item'>
              
              {!isEditable ? <p>{deviceInfo.windows}</p> : (
                <input 
                  className=''
                  type="text"
                  value={editDeviceInfo.windows} 
                  onChange={e => setEditDeviceInfo({ ...editDeviceInfo, windows: e.target.value })}
                />
              )}
              {!isEditable ? <p>{deviceInfo.processor}</p> : (
                <input 
                  className=''
                  type="text"
                  value={editDeviceInfo.processor} 
                  onChange={e => setEditDeviceInfo({ ...editDeviceInfo, processor: e.target.value })}
                />
              )}
              {!isEditable ? <p>{deviceInfo.diagonal}</p> : (
                <input 
                  className=''
                  type="text"
                  value={editDeviceInfo.diagonal} 
                  onChange={e => setEditDeviceInfo({ ...editDeviceInfo, diagonal: e.target.value })}
                />
              )}
              {!isEditable ? <p>{deviceInfo.disk}</p> : (
                <input 
                  className=''
                  type="text"
                  value={editDeviceInfo.disk} 
                  onChange={e => setEditDeviceInfo({ ...editDeviceInfo, disk: e.target.value })}
                />
              )}
            </div>
            {/* <div className='device-category'>
              

            </div>
            <div className='device-category'>
              

            </div> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default DeviceInfo
