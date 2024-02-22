import axios from "axios";
import axiosInterface from "../lib/axios";

export async function getComments({ slug }) {
  try {
    const response = await axiosInterface.get(`/articles/${slug}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
//{
// comment:{
// body: ""
// }
// }
export async function addComment({ slug, comment }) {
  try {
    const response = await axiosInterface.post(
      `/articles/${slug}/comments`,
      comment
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function deleteComment({ slug, id }) {
  try {
    await axiosInterface.delete(`/articles/${slug}/comments/${id}`);
  } catch (error) {
    throw error;
  }
}
