import { post } from "../lib/request";

export const authenticate = async (user, password) => {
  try {
    const res = await post("/authentication", {
        strategy: "local",
        user,
        password
    });
    const getTokenUser = jwt => {
      return res.data;
    }
    console.log(res.data);
    console.log(jwt);
  } catch (error) {
    return error.response && error.response.status === 404
      ? "Usuario o Contraseña Erroneas"
      : "Error desconocido, intentelo nuevamente";
  }
};