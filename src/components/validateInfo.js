export function validateSignUp(values) {
  let errors = {}

  if (!values.username.trim()) {
    errors.username = 'Nazwa użytkownika jest wymagana'
  }

  if (!values.email) {
    errors.email = 'Adres email jest wymagany'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Adres email jest nieprawidłowy'
  }
  if (!values.password) {
    errors.password = 'Hasło jest wymagane'
  } else if (values.password.length < 6) {
    errors.password = 'Hasło musi zawierać przynajmniej 6 znaków'
  }

  if (!values.password2) {
    errors.password2 = 'Hasło jest wymagane'
  } else if (values.password2 !== values.password) {
    errors.password2 = 'Hasła nie pasują do siebie'
  }

  return errors
}

export function validatePersonalInfo(values) {
  let errors = {}

  if (!values.firstName) {
    errors.firstName = 'Nazwa użytkownika jest wymagana'
  }

  if (!values.lastName) {
    errors.lastName = 'Hasło jest wymagane'
  }

  return errors
}

export function validateLoginInfo(values) {
  let errors = {}

  if (!values.usernameLogin) {
    errors.usernameLogin = 'Nazwa użytkownika jest wymagana'
  }

  if (!values.passwordLogin) {
    errors.passwordLogin = 'Hasło jest wymagane'
  }
  return errors
}
