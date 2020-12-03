export const validateNewUser = (
    firstName,
    lastName,
    identification,
    birth_date,
    email,
    password
) => {
  if (!firstName) {
    return "El campo nombre es requerido.";
  }

  if (!lastName) {
    return "El campo apellido es requerido.";
  }

  if (!identification) {
    return "El campo identificación es requerido.";
  }

  if (!birth_date) {
    return "El campo fecha de nacimiento es requerido.";
  }

  if (!password) {
    return "El campo contraseña es requerido";
  }

  if (!(password.length >= 5)) {
      return "La contraseña debe tener minimo 5 caracteres.";
  }

  return validateCredentials(email, password);
};

export const validateCredentials = (user, password) => {
    if (!user || !password) {
      return "Los campos de usuario y contraseña son requeridos";
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user)) {
      return "El Email no tiene el formato correcto.";
    }

    if (!(password.length >= 5)) {
        return "La contraseña debe tener minimo 5 caracteres.";
    }

    return null;
};