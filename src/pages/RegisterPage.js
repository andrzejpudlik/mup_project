import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import SignUpInfo from '../components/SignUpInfo'
import PersonalInfo from '../components/PersonalInfo'
import { validateSignUp, validatePersonalInfo } from '../components/validateInfo'

function RegisterPage() {
  const [page, setPage] = useState(0);
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatedSignUp, setIsValidatedSignUp] = useState(false);

  const navigate = useNavigate();

  const FormTitles = ["Rejestracja", "Dodatkowe informacje"];

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isValidatedSignUp) {
      setPage((currPage) => currPage + 1);
    }
  }, [formErrors]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      alert("Form success send")
    }
  }, [formErrors]);

  const handleSubmit = e => {
    if (page === FormTitles.length - 1) {
      e.preventDefault();
      setFormErrors(validatePersonalInfo(values));
      setIsSubmitting(true);
    } else {
      e.preventDefault();
      setFormErrors(validateSignUp(values));
      setIsValidatedSignUp(true);
    }
  }

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo values={values} setValues={setValues} errors={formErrors} />;
    }  else if (page === 1 && isValidatedSignUp) {
      return <PersonalInfo values={values} setValues={setValues} errors={formErrors} />;
    }
  };

  return (
    <Layout>
      <div className='form-container'>
        <div className='form'>
          <h1>{FormTitles[page]}</h1>
          {PageDisplay()}
          <div className='form-input-footer'>
            {page === 1 ? (
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
    </Layout>
  );
}

export default RegisterPage;