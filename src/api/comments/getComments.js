import { useQuery } from "@tanstack/react-query";
import axiosInterface from "../../lib/axios";
import commentsQuery from "../../queries/commentsQuery";

export async function getComments({ slug }) {
  try {
    const response = await axiosInterface.get(`/articles/${slug}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function getCommentsHook({ slug }) {
  return useQuery(commentsQuery(slug));
}
