import React from "react";

function PersonalInfo({ values, setValues, errors }) {
  return (
    <>
      <div className='form-inputs'>
        <label className='form-label'>Imię</label>
        <input
          className='form-input'
          type='text'
          name='firstName'
          placeholder='Podaj swoje imię'
          value={values.firstName}
          onChange={e => setValues({...values, firstName: e.target.value})}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>
      <div className='form-inputs'>
        <label className='form-label'>Nazwisko</label>
        <input
          className='form-input'
          type='text'
          name='lastName'
          placeholder='Podaj swoje nazwisko'
          value={values.lastName}
          onChange={e => setValues({...values, lastName: e.target.value})}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>
    </>
  );
}

export default PersonalInfo;