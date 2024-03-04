import axiosInterface from "../../lib/axios";

export async function getArticle({ slug }) {
  try {
    const response = await axiosInterface.get(`/articles/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
