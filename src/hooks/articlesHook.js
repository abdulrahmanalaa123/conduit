import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFunction } from "../api/articleFetchingApi";

//extracted as a custom hook for refactoring ease if the call of data in articlesform isnt the rigth thing to do
function articlesQuery({ page, feed, author, tag }) {
  console.log("if more than once then it re renders");
  return useQuery({
    queryKey: [
      feed,
      {
        page,
        ...(tag && feed === "tagged" && { tag }),
        ...(author && feed === "my" && { author }),
        ...(author && feed === "favorited" && { favorited: author }),
      },
    ],
    placeholderData: keepPreviousData,
    queryFn: () =>
      getFunction({
        feedState: feed,
        page: page,
        tag: tag,
        author,
      }),
  });
}

export default articlesQuery;
