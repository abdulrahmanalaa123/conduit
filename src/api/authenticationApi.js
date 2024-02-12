import axiosInterface from "../helpers/axios";

export async function login(loginObject) {
  const response = await axiosInterface.normalInterface.post(
    "/users/login",
    loginObject
  );
  console.log(response);
}

export async function logout() {}

export async function register(registerObject) {
  response = await axiosInterface.normalInterface.post(
    "/users",
    registerObject
  );
  console.log(response);
}
