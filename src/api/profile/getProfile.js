import { useQuery } from "@tanstack/react-query";
import axiosInterface from "../../lib/axios";
import profileQuery from "../../queries/profileQuery";

export async function getProfile(username) {
  try {
    const response = await axiosInterface.get(`/profiles/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function getProfileQuery(username) {
  return useQuery(profileQuery(username));
}
