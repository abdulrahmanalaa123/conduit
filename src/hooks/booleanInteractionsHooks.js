import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favorite, unFavorite } from "../api/articleFetchingApi";
import { followUser, unfollowUser } from "../api/profileApi";

export function LikeHook({ currentArticle, setCurrentArticle }) {
  const queryClient = useQueryClient();
  return useMutation({
    // the function is switched because the onmutate function executes first and changes the current favorite state before using the function
    mutationFn: currentArticle.favorited ? favorite : unFavorite,
    onMutate: () => {
      const oldArticle = currentArticle;
      const newArticle = {
        ...currentArticle,
        favorited: !currentArticle.favorited,
        favoritesCount: currentArticle.favorited
          ? currentArticle.favoritesCount - 1
          : currentArticle.favoritesCount + 1,
      };
      setCurrentArticle(newArticle);
      return oldArticle;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["global"] });
      queryClient.invalidateQueries({ queryKey: ["your"] });
      queryClient.invalidateQueries({ queryKey: ["tagged"] });
    },
    onError: (context) => {
      setCurrentArticle(context);
    },
  });
}
export function followHook({ following, setFollowing, username }) {
  const queryClient = useQueryClient();
  return useMutation({
    //reversed because onmutate changes it before using the function
    mutationFn: following ? followUser : unfollowUser,
    onMutate() {
      setFollowing(!following);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["profile", username],
        exact: true,
      });
    },
    onError() {
      setFollowing(!following);
    },
  });
}
