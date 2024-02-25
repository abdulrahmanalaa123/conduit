import { useQueryClient } from "@tanstack/react-query";

//deprecated although needs to be handled to work properly
function queryInvalidator() {
  queryClient = useQueryClient();

  queryClient.invalidateQueries({
    queryKey: ["global"],
    refetchType: "active",
  });
  queryClient.invalidateQueries({ queryKey: ["your"], refetchType: "active" });
  queryClient.invalidateQueries({
    queryKey: ["tagged"],
    refetchType: "active",
  });
  queryClient.invalidateQueries({ queryKey: ["my"], refetchType: "active" });
  queryClient.invalidateQueries({
    queryKey: ["favorited"],
    refetchType: "active",
  });
}
