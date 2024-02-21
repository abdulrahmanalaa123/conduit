import axiosInterface from "../lib/axios";

export async function getProfile(username) {
  try {
    const response = await axiosInterface.get(`/profiles/${username}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function followUser(username) {
  try {
    await axiosInterface.post(`/profiles/${username}/follow`);
  } catch (error) {
    throw error;
  }
}
export async function unfollowUser(username) {
  try {
    await axiosInterface.delete(`/profiles/${username}/follow`);
  } catch (error) {
    throw error;
  }
}
