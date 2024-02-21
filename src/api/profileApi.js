import axiosInterface from "../lib/axios";

export async function getProfile(username) {
  try {
    const response = await axiosInterface.get(`/profiles/${username}`);
    return response;
  } catch (error) {
    throw error;
  }
}
