import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getArticlesByPage, getYourFeed } from "../api/articleFetchingApi";

function getFunction({ feedState, page, tag, author }) {
  const functionsObject = {
    global: getArticlesByPage({ page }),
    tagged: getArticlesByPage({ page, tag }),
    following: getYourFeed({ page }),
    my: getArticlesByPage({ page, author }),
    favorited: getArticlesByPage({ page, favorited: author }),
  };

  return functionsObject[feedState];
}

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
