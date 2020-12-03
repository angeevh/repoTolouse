import { post } from "../lib/request";

export const createUser = async (
  firstName,
  lastName,
  identification,
  birth_date,
  email,
  password
) => {
  try {
    const response = await post("/customer-user", {
        firstName,
        lastName,
        identification,
        birth_date,
        email,
        password
    });
    return response;
  } catch (error) {
    return error.response && error.response.status === 422
      ? "El email ya se encuentra registrado."
      : "Error desconocido, por favor inténtelo nuevamente";
  }
};


export const getCurrentUser = jwt => {
  return getData("/current", jwt);
};

const getData = (endpoint, jwt) => {
  try {
    return get(endpoint, jwt);
  } catch (error) {
    return error;
  }
};