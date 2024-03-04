import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
});
