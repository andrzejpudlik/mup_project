import React from 'react'

function OtherDeviceInfo({ formData, setFormData }) {
  return (
    <div className='container'>
      <div className='container-item'>
        <label className='new-label'>Windows</label>
        <select 
          className='new_type-input'
          onChange={e => setFormData({ ...formData, windows: e.target.value })}
        >
          <option className='new_type-input' value='Nie dotyczy'>Nie dotyczy</option>
          <option value='11'>11</option>
          <option value='10'>10</option>
          <option value='8'>8</option>
          <option value='7'>7</option>
        </select>
      </div>
      {/* <Input
        value={formData.windows}
        onChange={e => setFormData({ ...formData, label: e.target.value })}
        placeholder='Podaj rodzaj systemu'
        size='sm'
      /> */}
      <div className='container-item'>
        <label className='new-label'>Dysk</label>
        <input
          className='new_type-input'
          type='text'
          placeholder='Podaj informacje o dysku'
          value={formData.disk}
          onChange={e => setFormData({ ...formData, disk: e.target.value })}
        />
      </div>
      <div className='container-item'>
        <label className='new-label'>Procesor</label>
        <input
          className='new_type-input'
          type='text'
          placeholder='Podaj informacje o procesorze'
          value={formData.processor}
          onChange={e => setFormData({ ...formData, processor: e.target.value })}
        />
      </div>
      <div className='container-item'>
        <label className='new-label'>Przekątna</label>
        <input
          className='new_type-input'
          type='text'
          placeholder='Podaj informacje o przekątnej'
          value={formData.diagonal}
          onChange={e => setFormData({ ...formData, diagonal: e.target.value })}
        />
      </div>
    </div>
  )
}

export default OtherDeviceInfo
