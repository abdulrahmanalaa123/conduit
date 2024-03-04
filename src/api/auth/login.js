import axiosInterface from "../../lib/axios";
import { setIdentification } from "./identification";

export async function login(loginObject) {
  try {
    const response = await axiosInterface.post("/users/login", loginObject);
    setIdentification(response.data);
  } catch (error) {
    throw error;
  }
}
