import axios from "axios";
import axiosInterface from "../lib/axios";

export async function getCurrentUser() {
  try {
    const response = await axiosInterface.get("/user");
    return response;
  } catch (error) {
    throw error;
  }
}
