import { useMutation } from "@tanstack/react-query";
import axiosInterface from "../../lib/axios";
import { queryClient } from "../../lib/queryClient";

async function addComment({ slug, comment }) {
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
export default function addCommentHook({ slug, emptyBody }) {
  return useMutation({
    mutationFn: addComment,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["comments", slug],
        exact: true,
      });
      emptyBody();
    },
  });
}
