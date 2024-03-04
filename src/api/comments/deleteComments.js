import { useMutation } from "@tanstack/react-query";
import axiosInterface from "../../lib/axios";
import { queryClient } from "../../lib/queryClient";

async function deleteComment({ slug, id }) {
  try {
    await axiosInterface.delete(`/articles/${slug}/comments/${id}`);
  } catch (error) {
    throw error;
  }
}

export default function deleteCommentHook({ slug }) {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["comments", slug],
        exact: true,
      });
    },
  });
}
