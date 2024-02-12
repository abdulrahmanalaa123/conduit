import axiosInterface from "../helpers/axios";

// all must be changed into an error interceptor that throws the error data but fuck it ill do it later
export async function login(loginObject) {
  await axiosInterface.normalInterface
    .post("/users/login", loginObject)
    .catch(function (error) {
      throw error.response.data;
    });
}

export async function logout() {}

export async function signUp(registerObject) {
  await axiosInterface.normalInterface
    .post("/users", registerObject)
    .catch(function (error) {
      throw error.response.data;
    });
}
