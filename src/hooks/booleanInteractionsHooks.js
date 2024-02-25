import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favorite, unFavorite } from "../api/articleApi";
import { followUser, unfollowUser } from "../api/profileApi";

//ill leave both hooks as is since both give better user experience
//and they break in the case the user isnt logged in so it shows that the post is liked for a second
//before navigating to the sign up page so when you come back its as you left it since the request is blocked
//because of no authorization but this method gives the user a seamless like and follow button experience
//instead of waiting for the request to complete and change state on success
//i coudlve used setqueryData but i didnt know how to use it for feeds so i opted to state change

export function LikeHook({ currentArticle, setCurrentArticle }) {
  const queryClient = useQueryClient();
  return useMutation({
    // the function is switched because the onmutate function executes first and changes the current favorite state before using the function
    mutationFn: currentArticle.favorited ? favorite : unFavorite,
    onMutate: () => {
      const oldArticle = { ...currentArticle };
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
      queryClient.invalidateQueries({
        queryKey: ["global"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["your"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["tagged"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["my"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["favorited"],
        refetchType: "active",
      });
    },
    onError: (context) => {
      setCurrentArticle(context);
    },
  });
}
//well the state containing the object isnt good for issues of generalizing
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
      queryClient.invalidateQueries({ queryKey: ["your"] });
    },
    onError() {
      setFollowing(!following);
    },
  });
}
