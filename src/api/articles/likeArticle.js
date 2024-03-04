import { useMutation } from "@tanstack/react-query";
import axiosInterface from "../../lib/axios";
import invalidateFetches from "../../lib/invalidateFetches";

async function favorite({ slug }) {
  try {
    await axiosInterface.post(`articles/${slug}/favorite`);
  } catch (error) {
    throw error;
  }
}
async function unFavorite({ slug }) {
  try {
    await axiosInterface.delete(`articles/${slug}/favorite`);
  } catch (error) {
    throw error;
  }
}

export default function likeHook({ currentArticle, switchState }) {
  return useMutation({
    // the function is switched because the onmutate function executes first and changes the current favorite state before using the function
    mutationFn: currentArticle.favorited ? favorite : unFavorite,
    onMutate: () => {
      const oldArticle = { ...currentArticle };
      switchState();
      return oldArticle;
    },
    onSuccess: () => {
      invalidateFetches();
    },
    onError: (context) => {
      setCurrentArticle(context);
    },
  });
}
