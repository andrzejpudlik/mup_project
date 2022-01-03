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

  if (!values.username) {
    errors.username = 'Nazwa użytkownika jest wymagana'
  }

  if (!values.password) {
    errors.password = 'Hasło jest wymagane'
  }
  return errors
}

export function validateOtherDeviceInfo(values) {
  let errors = {}

  if (!values.disk) {
    errors.disk = 'Informacja o dysku jest wymagana'
  }

  if (!values.processor) {
    errors.processor = 'Informacja o procesorze jest wymagana'
  }

  if (!values.diagonal) {
    errors.diagonal = 'Informacja o przekątnej jest wymagana'
  }
  return errors
}

export function validateModelDeviceInfo(label, model) {
  let errors = {}

  if (!label) {
    errors.label = 'Informacja o numerze inwentarzowym jest wymagana'
  }

  if (!model) {
    errors.model = 'Informacja o modelu jest wymagana'
  }
  return errors
}

export function validateTypeDeviceInfo(values) {
  let errors = {}
  
  if (!values) {
    errors.type = 'Informacja o typie urządzenia jest wymagana'
  }
  return errors
}
