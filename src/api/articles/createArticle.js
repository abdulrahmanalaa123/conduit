import axiosInterface from "../../lib/axios";

export default async function createArticle({ data }) {
  // can be handled with catch since there are no dependent lines of code
  try {
    const response = await axiosInterface.post("/articles", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
