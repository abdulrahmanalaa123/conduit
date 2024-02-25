import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getArticlesByPage, getYourFeed } from "../api/articleApi";

function getFunction({ feedState }) {
  //now i know why it was like 11 fucntion calls because i was calling the function and waiting for a response each time
  //i instantiated the object now it turns out im dumb as fuck since i didnt know that the query for the react query
  //had a key context to access the context if i wanted i needed to read the docs better because skimming and selective reading
  //wasnt that good
  //old object wich caused the problem
  // const functionsObject = {
  //   global: getArticlesByPage({page}),
  //   tagged: getArticlesByPage({page,tag}),
  //   following: getYourFeed({page}),
  //   my: getArticlesByPage({page,author}),
  //   favorited: getArticlesByPage({page,favorited:author}),
  // };
  const functionsObject = {
    global: getArticlesByPage,
    tagged: getArticlesByPage,
    following: getYourFeed,
    my: getArticlesByPage,
    favorited: getArticlesByPage,
  };

  return functionsObject[feedState];
}

//extracted as a custom hook for refactoring ease if the call of data in articlesform isnt the rigth thing to do
function articlesQuery({ page, feed, author, tag }) {
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
    queryFn: ({ queryKey }) =>
      //i can use the query function like this because of the conditional querykey
      getFunction({
        feedState: feed,
      })(queryKey[1]),
  });
}

export default articlesQuery;
