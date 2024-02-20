import axiosInterface from "../lib/axios";

export async function getTags() {
  try {
    const response = await axiosInterface.get("/tags");
    return response.data;
  } catch (error) {
    throw error;
  }
}
