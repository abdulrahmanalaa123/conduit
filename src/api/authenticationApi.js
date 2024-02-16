import useAuthStore from "../stores/auth";
import axiosInterface from "../lib/axios";

function setIdentification(responseData) {
  useAuthStore
    .getState()
    .setIdentification(responseData.user.token, responseData.user.username);
}
// all must be changed into an error interceptor that throws the error data but fuck it ill do it later
export async function login(loginObject) {
  try {
    const response = await axiosInterface.post("/users/login", loginObject);
    setIdentification(response.data);
  } catch (error) {
    throw error;
  }
}

export function logout() {
  useAuthStore.getState().deleteIdentification();
}

export async function signUp(registerObject) {
  try {
    const response = await axiosInterface.post("/users", registerObject);
    setIdentification(response.data);
  } catch (error) {
    throw error;
  }
}
