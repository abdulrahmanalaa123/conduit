import axiosInterface from "../../lib/axios";
import { setIdentification } from "./identification";

export async function editUser(userObject) {
  try {
    const response = await axiosInterface.put("/user", userObject);
    setIdentification(response.data);
  } catch (error) {
    throw error;
  }
}
