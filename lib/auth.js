import redirect from "./redirect";
import { setCookie, getCookie, removeCookie } from "./session";
import { authenticate } from "../services/authApi";
import { createUser } from "../services/userApi";
import { validateCredentials, validateNewUser } from "./validation";

export const signIn = async (user, password) => {
  const error = validateCredentials(user, password);
  if (error) {
    return error;
  }

  const res = await authenticate(user, password);
  if (!res.jwt) {
    return res;
  }

  setCookie("jwt", res.jwt);
  console.log(res.jwt)
  redirect("(/");
  return null;
};

export const signUp = async (firstName, lastName, identification, birth_date, email, password) => {
  const error = validateNewUser(firstName, lastName, identification, birth_date, email, password);
  if (error) {
    return error;
  }

  const res = await createUser(firstName, lastName, identification, birth_date, email, password);

  if (!res.data) {
    return res;
  }

  setCookie("success", `${firstName}, Tu cuenta ha sido creada.`);
  redirect("/auth/login");
  return null;
};

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie("jwt");
    redirect("/auth/login", ctx);
  }
};

export const getJwt = ctx => {
  return getCookie("jwt", ctx.req);
};

export const isAuthenticated = ctx => !!getJwt(ctx);

export const redirectIfAuthenticated = ctx => {
  if (isAuthenticated(ctx)) {
    redirect("/auth/address", ctx);
    return true;
  }
  return false;
};

export const redirectIfNotAuthenticated = ctx => {
  if (!isAuthenticated(ctx)) {
    redirect("/auth/login", ctx);
    return true;
  }
  return false;
};
