import axiosInterface from "../../lib/axios";
import { setIdentification } from "./identification";

export async function signUp(registerObject) {
  try {
    const response = await axiosInterface.post("/users", registerObject);
    setIdentification(response.data);
  } catch (error) {
    throw error;
  }
}
