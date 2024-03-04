import { useMutation } from "@tanstack/react-query";
import axiosInterface from "../../lib/axios";
import invalidateFetches from "../../lib/invalidateFetches";

async function deleteArticle({ slug }) {
  try {
    await axiosInterface.delete(`/articles/${slug}`);
  } catch (error) {
    throw error;
  }
}

export default function deleteArticleHook(navigate) {
  return useMutation({
    mutationFn: deleteArticle,
    onSuccess() {
      invalidateFetches();
      navigate("/");
    },
  });
}
