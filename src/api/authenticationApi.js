import useAuthStore from "../stores/auth";
import axiosInterface from "../lib/axios";

function setIdentification(responseData) {
  useAuthStore
    .getState()
    .setIdentification(responseData.user.token, responseData.user.username);
}
// all must be changed into an error interceptor that throws the error data but fuck it ill do it later
export async function login(loginObject) {
  const response = await axiosInterface
    .post("/users/login", loginObject)
    .catch(function (error) {
      throw error.response.data;
    });

  setIdentification(response.data);
}

export function logout() {
  useAuthStore.getState().deleteIdentification();
}

export async function signUp(registerObject) {
  const response = await axiosInterface
    .post("/users", registerObject)
    .catch(function (error) {
      throw error.response.data;
    });

  setIdentification(response.data);
}
