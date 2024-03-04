import { queryClient } from "./queryClient";

export default function invalidateFetches() {
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
}
