import axiosInterface from "../../lib/axios";

export default async function editArticle({ data }) {
  try {
    const response = await axiosInterface.put(
      `/articles/${data.article.slug}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
