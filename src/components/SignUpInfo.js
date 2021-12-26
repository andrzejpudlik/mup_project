import React from 'react'

function SignUpInfo({ values, setValues, errors }) {
  return (
    <>
      <div className='form-inputs'>
        <label className='form-label'>Nazwa użytkownika</label>
        <input
          className='form-input'
          type='text'
          name='username'
          placeholder='Podaj nazwę użytkownika'
          value={values.username}
          onChange={e => setValues({...values, username: e.target.value})}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div className='form-inputs'>
        <label className='form-label'>Email</label>
        <input
          className='form-input'
          type='email'
          name='email'
          placeholder='Podaj email'
          value={values.email}
          onChange={e => setValues({...values, email: e.target.value})}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div className='form-inputs'>
        <label className='form-label'>Hasło</label>
        <input
          className='form-input'
          type='password'
          name='password'
          placeholder='Podaj hasło'
          value={values.password}
          onChange={e => setValues({...values, password: e.target.value})}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div className='form-inputs'>
        <label className='form-label'>Potwierdź hasło</label>
        <input
          className='form-input'
          type='password'
          name='password2'
          placeholder='Powtórz hasło'
          value={values.password2}
          onChange={e => setValues({...values, password2: e.target.value})}
        />
        {errors.password2 && <p>{errors.password2}</p>}
      </div>
      {/* <button className='form-input-btn' type='submit'>
        Zarejestruj się
      </button> */}
    </>
  )
}

export default SignUpInfo
