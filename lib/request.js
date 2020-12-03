import axios from "axios";

const API_HOST = "https://api-qa.toulouse.com.co";

const getUrl = endpoint => API_HOST + endpoint;

export const post = async (endpoint, data) => {
  return axios.post(getUrl(endpoint), data, {
    credentials : 'include',
    mode : 'no-cors',
    headers: { "Content-Type": "application/json" }
  });
};

export const get = async (endpoint, jwt) => {
  const headers = jwt
    ? {
      headers: { Authorization: `Bearer ${jwt}` }
    }
    : null;
  return axios.get(getUrl(endpoint), headers);
};