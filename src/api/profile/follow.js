import { useMutation } from "@tanstack/react-query";
import axiosInterface from "../../lib/axios";
import { queryClient } from "../../lib/queryClient";

async function followUser(username) {
  try {
    await axiosInterface.post(`/profiles/${username}/follow`);
  } catch (error) {
    throw error;
  }
}
async function unfollowUser(username) {
  try {
    await axiosInterface.delete(`/profiles/${username}/follow`);
  } catch (error) {
    throw error;
  }
}

export default function followHook({ following, setFollowing, username }) {
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
      queryClient.invalidateQueries({
        queryKey: ["your"],
        refetchType: "active",
      });
    },
    onError() {
      setFollowing(!following);
    },
  });
}
